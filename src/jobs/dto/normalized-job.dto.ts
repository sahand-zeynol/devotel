export class NormalizedJobDto {
  externalJobId: string;
  title: string;
  employmentType?: string;
  postedDate?: Date;
  sourceName: string;

  company: {
    name: string;
    website?: string;
    industry?: string;
  };

  location: {
    city?: string;
    state?: string;
    remote?: boolean;
    fullAddress?: string;
  };

  salary: {
    min?: number;
    max?: number;
    currency?: string;
    rawText?: string;
  };

  requirement?: {
    experience?: number;
  };

  technologies?: string[];
}
