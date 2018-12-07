import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'activities-bottom-sheet',
  templateUrl: 'activities.bottomsheet.component.html',
})
export class ActivitiesBottomsheetComponent {
    activities: any[];

  getCategoryImageURI(categoryName: string): string {
    const uri = '/imgs/categories/' + categoryName + '.svg';
    if (this.ImageExists(uri)) {
      return uri;
    } else {
      return '/imgs/categories/gaming.svg';
    }
  }

  private ImageExists(url: string): boolean {
    const img = new Image();
    img.src = url;
    return img.height !== 0;
  }

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<ActivitiesBottomsheetComponent>) {
        this.activities = data.activities;
  }

  closeSheet(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
