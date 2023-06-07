import RequestHttp from "~/utils/request";
function StatisticService() {
    const { request } = RequestHttp();
    const getCoursesByLevel = async () => {
        try {
            const res = await request.get("/statistics/coursesByLevel");
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    };
    const getStatistics = async () => {
        try {
            const res = await request.get("/statistics/dashboard");
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    };
    return {
        getCoursesByLevel,
        getStatistics,
    };
}

export default StatisticService;
