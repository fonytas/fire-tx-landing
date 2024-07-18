import { Job } from "@/types/api";
import { AxiosInstance } from "axios";

export class MulticastApi {
  public name: string;
  private apiInstance: AxiosInstance;

  constructor(name: string, apiInstance: AxiosInstance) {
    this.name = name;
    this.apiInstance = apiInstance;
  }

  async accounts(): Promise<string[]> {
    const res = await this.apiInstance.get("/accounts");
    return res.data;
  }

  async jobs(): Promise<Job[]> {
    const res = await this.apiInstance.get("/jobs");
    return res.data;
  }

  async exec(minute: number): Promise<string> {
    const res = await this.apiInstance.post("/exec", {
      minute,
    });
    return res.data.id;
  }

  async terminateAll(): Promise<void> {
    await this.apiInstance.post("/admin/terminate-all")
    return;
  }

  async idle(): Promise<void> {
    await this.apiInstance.post("/idle")
    return;
  }

  async exec_demo(demo: number): Promise<void> {
    await this.apiInstance.post(`/exec/${demo}`)
    return;
  }
}
