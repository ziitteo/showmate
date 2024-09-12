import { useQuery } from "@tanstack/react-query"
import fetchData from '../utils/api'; // 공통 API 요청 함수
// import api from "../utils/api";
import axios from "../utils/axios";
import { parseXML } from "../utils/util";
import { useEffect } from "react";
const useDetailInfoQuery = async(id) => {
  // console.log('useDetailInfoQuery id', id)
  const request = await axios.get(`/pblprfr/${id}`)
  // console.log(axios.get(`/pblprfr/${id}`))
  console.log('request',request)
  const jsonData = parseXML(request.data);
  console.log('jsonData',jsonData.dbs.db)

  return jsonData.dbs.db;


  // useEffect(() => {
  //   const getDataApi = async () => {
  //     try {
  //       const response = await Promise.all(axios.get(`/pblprfr/${id}`))
  //       // const response = await Promise.all(members.map(member => axios.get(`https://apikey=${member.apiKey}`)));
	//       console.log(response);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   getDataApi();
  // }, []);


  // const fetchData = async () => {
  //   const request = await axios.get(`/pblprfr/${id}`)
  //   console.log('request', request)
  // }
  // console.log('fetchData', fetchData)
  // return useQuery({
  //   queryKey:['details'],
  //   // queryFn:() => fetchDetailInfo(id),
  //   queryFn: async() => {
  //     const result = await fetchDetailInfo(id);
  //     console.log('result, result', result)
  //     return result;
  //   },
    // queryFn: async() => {
    //   await axios.get(`/pblprfr/${id}`,{})
    // },
    // select: data => {
    //   console.log('select data', data)
    //   // data.dbs?.db || []
    // }
  
}

export default useDetailInfoQuery;

// import fetchData from '../utils/api'; // 공통 API 요청 함수
// import { useInfiniteQuery } from '@tanstack/react-query';

// const useDetailInfoQuery = (id, params = {}) => {
//   const defaultParams = {...params};

//   return useInfiniteQuery({
//     queryKey:['details', id],
//     queryFn: async() => await fetchData(`/pblprfr/${id}`, defaultParams),
//     select: data => data.dbs?.db || []
//   })
// }

// export default useDetailInfoQuery;