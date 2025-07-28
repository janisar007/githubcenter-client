export interface PullRequestDataType {
  pullRequests: {
    [repoName: string]: PullRequestWithWorkflows[];
  };
}

export interface PullRequestWithWorkflows {
  pr: PullRequest;
  workflows: WorkflowRun[] | null;
}

export interface PullRequest {
  number: number;
  title: string;
  state: string;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    html_url: string;
  };
  html_url: string;
}

export interface WorkflowRun {
  id: number;
  name: string;
  status: string;
  conclusion: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  jobs: WorkflowJob[];
}

export interface WorkflowJob {
  id: number;
  name: string;
  status: string;
  conclusion: string;
  started_at: string;
  completed_at: string;
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  // Steps are currently empty arrays, so use any or leave room for later typing
  [key: string]: any;
}
