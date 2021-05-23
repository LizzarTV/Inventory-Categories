export interface DaprBody {
  traceid: string;
  id: string;
  datacontenttype: string;
  type: string;
  topic: string;
  pubsubname: string;
  data: {
    pattern: string;
    data: any;
  };
  specversion: string;
  source: string;
}
