import http from "../http-common";

class TutorDataService {
  getAll() {
    return http.get("/tutors");
  }

  get(id) {
    return http.get(`/tutors/${id}`);
  }

  create(data) {
    return http.post("/tutors/", data);
  }

  delete(id) {
    return http.delete(`/tutors/${id}`);
  }

}

export default new TutorDataService();