import { apiUrl } from "./axios";

const speedoApi = {
    upload:apiUrl+'/uploadData',
    fetchTrips:apiUrl+"/fetechtrips",
    fetchTripDataWithrequiredData:apiUrl+'/getTripDetails'

}

export default speedoApi