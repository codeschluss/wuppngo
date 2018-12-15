import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, Output } from '@angular/core';
import { AngularOpenlayersModule, LayerVectorComponent, MapComponent, ViewComponent } from 'ngx-openlayers';
import { Feature, MapBrowserEvent, proj, style } from 'openlayers';
import { Subject } from 'rxjs';
import { AddressModel } from '../../../realm/address/address.model';
import { MatBottomSheet } from '@angular/material';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'mapping-component',
  templateUrl: 'mapping.component.html',
  styleUrls: ['mapping.component.scss']
})

export class MappingComponent implements AfterViewInit, OnInit
, OnDestroy {

  public static readonly imports = [
    AngularOpenlayersModule
  ];

  @Input()
  public activities: any[];

  @Input()
  public disabledPointerAction: boolean;

  @Output()
  hoveredActivities: EventEmitter<any[]> = new EventEmitter();

  public clusterspan: number;
  public latitude: number;
  public longitude: number;
  public projection: string;
  public zoomfactor: number;
  public highlightedMarkerId: string;
  public selectedActivities: any[];
  public fullScreen: boolean = false;

  @ViewChild(LayerVectorComponent)
  private aolLayer: LayerVectorComponent;

  @ViewChild(MapComponent)
  private aolMap: MapComponent;

  @ViewChild(ViewComponent)
  private aolView: ViewComponent;

  private readonly ngUnsubscribe: Subject<null> = new Subject<null>();

  public constructor(
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private router: Router
    ) {
      if (router.url.endsWith('/map')) {
        this.activities = route.snapshot.data.activities;
        this.fullScreen = true;
      }
    }

  public ngOnInit(): void {
      this.latitude = this.activities[0].address.latitude;
      this.longitude = this.activities[0].address.longitude;
      // TODO: get from DB
      this.zoomfactor = 14;
      this.projection = 'EPSG:4326';
      // TODO: move to db
      this.clusterspan = 5;
  }

  public ngAfterViewInit(): void {
    (<ol.layer.Vector>this.aolLayer.instance)
      .setStyle((feature: Feature) => this.clusterStyle(feature));

    this.aolMap.loadTilesWhileAnimating = true;
    this.aolMap.loadTilesWhileInteracting = true;
    if (!this.disabledPointerAction) {
      this.aolMap.onClick
      .subscribe((event: MapBrowserEvent) => {
        this.onClick(event);
          }
        );
      this.aolMap.onPointerMove.subscribe((event: MapBrowserEvent) => {
        this.onHover(event);
        }
      );
    }

  }

  public ngOnDestroy(): void {
    this.bottomSheet.dismiss();
  }

  public centerAddress(address: AddressModel): void {
    if (address.longitude && address.latitude) {
      this.aolView.instance.animate({
        center: proj.fromLonLat([address.longitude, address.latitude]),
        // duration: 1000,
        zoom: Math.max(this.aolView.instance.getZoom(), this.zoomfactor * 1.25)
      });
    }
  }

  public highlightPin(activity: any): void {
    this.highlightedMarkerId = activity.id;
    (<ol.layer.Vector>this.aolLayer.instance).changed();
  }

  public unHighlightPins() {
    this.highlightedMarkerId = null;
    (<ol.layer.Vector>this.aolLayer.instance).changed();
  }

  public zoomOut(): void {
    this.aolView.instance.animate({
      center: proj.fromLonLat([
        this.activities[0].address.longitude,
        this.activities[0].address.latitude]),
      // duration: 1000,
      zoom: 14
    });
  }

  private clusterStyle(feature: Feature): style.Style[] {
    let acts;
      acts = feature.get('features').map(i => {
        // TODO: ngx-openlayers async id binding bug
        // const activity = this.activities.find(j => i.getId() === j.id);
        const id = i.getId();
        return this.activities.find(j => id === j.id);
      });

    if (acts) {
      let icon = {
        anchor: [.5, 1],
        color: '#dd574a',
        src: `/imgs/map${acts.length > 1 ? 'cluster' : 'marker'}.svg`,
        scale: this.isHighlighted(acts) ? 1.2 : 1,
        opacity: this.isHighlighted(acts) ? 1 : 0.9,
      };

      const categoryIcon = {
        anchor: [.5, 2],
        src: `/imgs/categories/holiday.svg`,
        scale: 0.1
      };

      if (window.navigator.userAgent.match(/(MSIE|Trident)/)) {
        Object.assign(icon, {
        imgSize: [60, 96],
        // scale: 1 / 3,
        src: `/imgs/map${acts.length > 1 ? 'cluster' : 'marker'}.png`,
        scale: icon.scale / 3,
      });
      }

      let text;

      if (acts.length > 1) {
        text = {
          fill: new style.Fill({color: '#000000'}),
          offsetY: this.isHighlighted(acts) ? -25 : - 20,
          scale: 1.2,
          stroke: new style.Stroke({color: '#000000'}),
          text: acts.length + '',
          textAlign: 'center'
        };
      }
      if (this.activities.length === 1) {
        icon = {
          anchor: [.5, 1],
          color: '#dd574a',
          src: `/imgs/mapmarker.svg`,
          scale: 1,
          opacity: 1
        };
        return [new style.Style({
          image: new style.Icon(icon),
        })];
      }

      return acts.length > 1 ?
      [new style.Style({
        image: new style.Icon(icon),
        text: acts.length > 1 && new style.Text(text)
      })] :
      [new style.Style({
        image: new style.Icon(icon),
      }),
      new style.Style({
        image: new style.Icon(categoryIcon),
      })];

    }
  }

  private onClick(event: MapBrowserEvent): void {
    const click = this.aolMap.instance.getFeaturesAtPixel(event.pixel);
    if (click) {
      const feats = click && click.length ? click[0].get('features') : [];
      this.selectedActivities = feats.map(i => this.activities.find(
            j => j.id === i.getId()));
      this.highlightPin(this.selectedActivities[0]);
    } else {
      this.selectedActivities = null;
      this.unHighlightPins();
    }
  }

  private onHover(event: MapBrowserEvent): void {
    const target = this.aolMap.instance.getFeaturesAtPixel(event.pixel);
    if (target) {
      const feats = target && target.length ? target[0].get('features') : [];
      this.hoveredActivities.emit(
        feats.map(i => this.activities.find(j => j.id === i.getId()))
        );
    } else {
      this.hoveredActivities.emit(null);
    }
  }

  public isHighlighted(acts: any[]): boolean {
    if (this.highlightedMarkerId) {
      if (acts.find(act => act.id === this.highlightedMarkerId)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  public toListView(): void {
    this.router.navigate(['/list/activities']);
  }

}
