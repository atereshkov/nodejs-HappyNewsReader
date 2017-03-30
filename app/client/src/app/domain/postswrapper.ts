import {SummaryPost} from  './summarypost';

export class PostsWrapper{
  constructor(
    public status:string,
    public count_all:number,
    public data:SummaryPost[]){}
}
