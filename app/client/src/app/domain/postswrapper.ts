import {SummaryPost} from  './summarypost';

export class PostsWrapper{
  constructor(
    public status:string,
    public count:number,
    public data:SummaryPost[]){}
}
