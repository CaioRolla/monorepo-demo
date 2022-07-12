import { GetAllQueryDto } from '../get-all-query.dto';

export interface GetAllIdentifiersQueryDto extends GetAllQueryDto {
  select?: string[];
}
