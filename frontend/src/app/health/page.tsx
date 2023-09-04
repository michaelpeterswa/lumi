type Healthcheck = {
    healthy: boolean;
  }
  
  async function getHealthcheck() {
    const res = await fetch(`http://localhost:8081/healthcheck`, {
      method: 'GET',
      cache: 'no-store',
    });
  
    return res.json();
  }
  
  export default async function Home() {
  
    const healthcheckData = getHealthcheck();
    const healthcheck: Healthcheck = await healthcheckData;
  
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">
                the api server is {healthcheck.healthy ? "healthy" : "hnhealthy"}
            </h1>
        </div>
    )
  }