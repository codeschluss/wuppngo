import { CrudModel } from '@wooportal/core';
import { ScheduleEntity } from '../../api/models/schedule-entity';

export class ScheduleModel
  extends CrudModel implements ScheduleEntity {

  public endDate: string;
  public startDate: string;

}
