import axios from 'axios';
import {GraphQLClient} from 'graphql-request';
import {
  Credential,
  GraphQLRequestOptions,
  HttpRequestOptions,
  ProblemDetail,
  ProblemsetQuestionList,
  SubmissionResult,
  TestResult,
  Urls,
} from './interfaces';

class ApiCaller {
  private static instance: ApiCaller;

  private credential: Credential;
  private urls: Urls;

  private constructor() {
    this.credential = {session: '', csrftoken: ''};
    this.urls = {
      base: 'https://leetcode.com/',
      graphql: 'https://leetcode.com/graphql/',
    };
  }

  setCredential(credential: Credential) {
    this.credential = credential;
  }

  static getInstance(): ApiCaller {
    if (!ApiCaller.instance) {
      ApiCaller.instance = new ApiCaller();
    }

    return ApiCaller.instance;
  }

  async getProblems(
    slug: string,
    filter: object,
    limit: number,
    skip: number,
  ): Promise<ProblemsetQuestionList> {
    return await this.GraphQLRequest({
      query: `
      query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
        problemsetQuestionList: questionList(
          categorySlug: $categorySlug
          limit: $limit
          skip: $skip
          filters: $filters
        ) {
          total: totalNum
          questions: data {
            difficulty
            paidOnly: isPaidOnly
            frontendQuestionId: questionFrontendId
            title
            titleSlug
            topicTags {
              name
              slug
            }
            judgeType
          }
        }
      }
        `,
      variables: {
        categorySlug: slug,
        filters: filter,
        limit: limit,
        skip: skip,
      },
    }).then(res => {
      return res.problemsetQuestionList;
    });
  }

  async getProblemDetail(titleSlug: string): Promise<ProblemDetail> {
    return await this.GraphQLRequest({
      query: `
      query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionId
          title
          titleSlug
          content
          isPaidOnly
          difficulty
          topicTags {
            name
            slug
          }
          codeSnippets {
            lang
            langSlug
            code
          }
        }
      }
      `,
      variables: {
        titleSlug: titleSlug,
      },
    }).then(res => {
      return res.question;
    });
  }

  async getTestCases(titleSlug: string): Promise<string> {
    return await this.GraphQLRequest({
      query: `
      query consolePanelConfig($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          exampleTestcaseList
        }
      }      
      `,
      variables: {
        titleSlug: titleSlug,
      },
    }).then(res => {
      return res.exampleTestcaseList;
    });
  }

  async testSolution(
    slug: string,
    data_input: string,
    lang: string,
    question_id: string,
    typed_code: string,
  ): Promise<TestResult> {
    return await this.HttpRequest({
      method: 'POST',
      url: `problems/${slug}/interpret_solution/`,
      body: {
        data_input: data_input,
        lang: lang,
        question_id: question_id,
        typed_code: typed_code,
      },
    }).then(async res => {
      console.log(res.data);
      return await this.HttpRequest({
        method: 'GET',
        url: `submissions/detail/${res.data.interpret_id}/check`,
      }).then(ret => {
        return ret.data;
      });
    });
  }

  async submitSolution(
    slug: string,
    lang: string,
    question_id: string,
    typed_code: string,
  ): Promise<SubmissionResult> {
    return await this.HttpRequest({
      method: 'POST',
      url: `problems/${slug}/submit/`,
      body: {
        lang: lang,
        question_id: question_id,
        typed_code: typed_code,
      },
    }).then(async res => {
      return await this.HttpRequest({
        method: 'GET',
        url: `submissions/detail/${res.data.submission_id}/check`,
      }).then(ret => {
        return ret.data;
      });
    });
  }

  private async HttpRequest(options: HttpRequestOptions) {
    console.log(
      `LEETCODE_SESSION=${this.credential.session}; csrftoken=${this.credential.csrftoken}`,
    );
    return axios.request({
      url: this.urls.base + options.url,
      method: options.method,
      headers: {
        Cookie: `LEETCODE_SESSION=${this.credential.session};csrftoken=${this.credential.csrftoken}`,
        'x-csrftoken': this.credential.csrftoken,
        Origin: this.urls.base,
        Referer: this.urls.base,
        'Cache-Control': 'no-cache',
        UserAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
      },
      data: JSON.stringify(options.body) || '',
    });
  }

  private async GraphQLRequest(options: GraphQLRequestOptions) {
    const client = new GraphQLClient(this.urls.graphql, {
      headers: {
        Origin: options.origin || this.urls.base,
        Referer: options.referer || this.urls.base,
        Cookie: `LEETCODE_SESSION=${this.credential.session}; csrftoken=${this.credential.csrftoken}`,
        'X-CSRFToken': this.credential.csrftoken,
        UserAgent: 'PostmanRuntime/7.30.0',
      },
    });
    return await client.request(options.query, options.variables || {});
  }
}

export default ApiCaller;
