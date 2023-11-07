import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../api";
import { styled } from "styled-components";
import { useCurrentWeather } from "../lib/useCurrentWeather";
import { Loading } from "../components/Loading";

const Wrap = styled.div`
  max-width: 400px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: rgb(157, 211, 247);
  background: linear-gradient(
    0deg,
    rgba(157, 211, 247, 1) 0%,
    rgba(153, 151, 235, 1) 47%,
    rgba(195, 138, 255, 1) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 100px 0;
`;

const Location = styled.div`
  font-size: 30px;
  margin-bottom: 70px;
`;

const Temp = styled.div`
  font-size: 70px;
  font-weight: 700;
  margin-bottom: 70px;
`;

const Desc = styled.div`
  font-size: 18px;
  margin-bottom: 70px;
`;

const Separ = styled.div`
  width: 60px;
  height: 4px;
  background-color: white;
  margin-bottom: 70px;
`;

const ConWrap = styled.div`
  width: 100%;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
`;

const Con = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33%;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  &:last-child {
    border-right: none;
  }
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  p {
    font-size: 18px;
  }
`;

export const Home = () => {
  const { lat, lon } = useCurrentWeather();
  console.log(lat, lon);

  const { data, isLoading } = useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: getWeather,
  });
  // => api에 요청할 때 사용하는 hook
  // => 비동기 사용 시 상태관리하는 hook
  // => useQuery를 사용할 댄 반드시 QuetyClientProvider를 설정해줘야 함

  // console.log(data);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrap>
          <Location>{data?.name}</Location>
          <Temp>{Math.round(data?.main?.temp)}°</Temp>
          <Desc>{data?.main?.description}</Desc>

          <Separ></Separ>

          <ConWrap>
            <Con>
              <h3>체감온도</h3>
              <p>{Math.round(data?.main?.feels_like)}°</p>
            </Con>
            <Con>
              <h3>최저 온도</h3>
              <p>{Math.round(data?.main?.temp_min)}°</p>
            </Con>
            <Con>
              <h3>최고 온도</h3>
              <p>{Math.round(data?.main?.temp_max)}°</p>
            </Con>
          </ConWrap>
        </Wrap>
      )}
    </>
  );
};
