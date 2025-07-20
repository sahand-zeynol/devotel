import { Injectable } from "@nestjs/common";
import { NormalizedJobDto } from "./dto/normalized-job.dto";

@Injectable()
export class JobsMappingService {
  fromProviderA(response: any): NormalizedJobDto[] {
    const jobs = response.data.jobsList;
    return Object.entries(jobs).map(([id, job]: [string, any]) => ({
      externalJobId: id,
      title: job.position,
      postedDate: new Date(job.datePosted),
      employmentType: undefined,
      sourceName: "Provider A",

      company: {
        name: job.employer.companyName,
        website: job.employer.website,
      },

      location: {
        city: job.location.city,
        state: job.location.state,
        remote: job.location.remote,
      },

      salary: {
        min: job.compensation.min,
        max: job.compensation.max,
        currency: job.compensation.currency,
      },

      requirement: {
        experience: job.requirements.experience,
      },

      technologies: job.requirements.technologies,
    }));
  }

  fromProviderB(response: any): NormalizedJobDto[] {
    return response.jobs.map((job: any) => {
      const [minSalary, maxSalary] = (
        job.details.salaryRange.match(/\d+/g) || []
      ).map(Number);

      return {
        externalJobId: job.jobId,
        title: job.title,
        postedDate: new Date(job.postedDate),
        employmentType: job.details.type,
        sourceName: "Provider B",

        company: {
          name: job.company.name,
          industry: job.company.industry,
        },

        location: {
          fullAddress: job.details.location,
        },

        salary: {
          min: minSalary,
          max: maxSalary,
          rawText: job.details.salaryRange,
        },

        technologies: job.skills,
      };
    });
  }
}
