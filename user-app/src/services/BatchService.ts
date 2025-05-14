import apiClient from "../helpers/apiClient";

interface BatchService {
  getAll(countryZone: string): Promise<any>;
}

const BatchService: BatchService = {
  getAll(countryZone: string): Promise<any> {
    return apiClient.get(`/batch/getall/${countryZone}`);
  },
};

export default BatchService;