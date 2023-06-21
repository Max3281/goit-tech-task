import { useEffect, useState } from "react";
import { getData, updateData } from "../API/fakeData";

const TweetsPage = () => {
  const [data, setData] = useState(null);
  const [tweetsRender, setTweetsRender] = useState(null);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(Number(1));
  const [loadMoreDisabled, setLoadMoreDisabled] = useState(true);

  useEffect(() => {
    getData().then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    if (!data) return;
    setTweetsRender(data.slice(0, page * 3));

    const totalPage = Math.ceil(data.length / 3);

    if (data.length <= 3 || page === totalPage)
      return setLoadMoreDisabled(false);
    setLoadMoreDisabled(true);
  }, [data, page]);

  const followClick = async (id) => {
    const findUser = data.find((val) => val.id === id);

    const folInc = Number(findUser.followers) + 1;
    const folDec = Number(findUser.followers) - 1;
    const folChng = !findUser.isFollow ? folInc : folDec;

    const newVal = {
      ...findUser,
      isFollow: !findUser.isFollow,
      followers: folChng,
    };
    await updateData(id, newVal);
    switchFilter(filter);
  };

  const loadMoreClick = () => {
    setPage(page + 1);
  };

  const switchFilter = (value) => {
    getData().then((res) => {
      switch (value) {
        case "all":
          setFilter(value);
          setData(res);
          break;
        case "fol":
          setFilter(value);
          const folFil = res.filter((fil) => fil.isFollow);
          setData(folFil);
          break;
        case "unfol":
          setFilter(value);
          const folUnFil = res.filter((fil) => !fil.isFollow);
          setData(folUnFil);
          break;
        default:
          break;
      }
    });

    if (filter !== value) setPage(1);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const targVal = e.target.value;
    switchFilter(targVal);
  };

  return (
    <section>
      <form htmlFor="filter">
        <label htmlFor="filter">Filter</label>
        <select name="filter" id="filter" onChange={handleChange}>
          <option value="all">All tweets</option>
          <option value="fol">Following tweets</option>
          <option value="unfol">Non-following tweets</option>
        </select>
      </form>
      <ul className="tweets-block">
        {tweetsRender &&
          tweetsRender.map((val) => {
            return (
              <li key={val.id} className="tweet-card">
                <svg
                  className="svg-logo"
                  width="76"
                  height="22"
                  viewBox="0 0 111 32"
                >
                  <path d="M0 0v32h48.73l12.824-16-12.824-16h-48.73zM21.976 14.368c-0.076-0.060-0.151-0.121-0.226-0.181-0.189-0.152-0.374-0.301-0.565-0.444-0.521-0.394-1.087-0.708-1.736-0.848-0.717-0.155-1.44-0.212-2.155 0.003-1.020 0.305-1.73 0.971-2.199 1.897-0.39 0.771-0.493 1.588-0.391 2.438 0.081 0.665 0.298 1.283 0.694 1.83 0.609 0.841 1.44 1.327 2.479 1.455 0.935 0.116 1.84 0 2.697-0.406 0.293-0.139 0.293-0.142 0.293-0.462v-0.006c0-0.078 0-0.156 0-0.234 0-0.155 0.001-0.31-0-0.466-0-0.031 0-0.058 0.001-0.081 0.001-0.065 0.001-0.098-0.015-0.115s-0.054-0.017-0.129-0.016c-0.019 0-0.040 0.001-0.064 0.001h-2.718c-0.024 0-0.046 0-0.065 0-0.076 0.001-0.113 0.001-0.131-0.017s-0.016-0.051-0.015-0.117c0-0.022 0.001-0.047 0.001-0.077-0.001-0.716-0.001-1.433-0-2.149v-0.007c0-0.356 0-0.712 0-1.068 0-0.013 0-0.026 0.001-0.039 0.001-0.027 0.002-0.054-0.001-0.080-0.005-0.063 0.017-0.097 0.087-0.090 0.027 0.002 0.054 0.001 0.081 0.001l0.024-0.001 0.016-0h6.871c0.045 0 0.083 0.008 0.076 0.065-0.003 0.034 0.018 0.057 0.041 0.080 0.027 0.028 0.054 0.057 0.039 0.108-0.013 0.044-0.010 0.091-0.007 0.139 0.002 0.022 0.003 0.043 0.003 0.064l-0 1.225c-0 1.633-0.001 3.266 0.004 4.898 0 0.133-0.042 0.217-0.144 0.3-1.279 1.049-2.718 1.783-4.345 2.146-0.963 0.215-1.937 0.275-2.922 0.196-1.163-0.092-2.27-0.387-3.291-0.947-1.875-1.027-3.056-2.586-3.599-4.621-0.239-0.899-0.312-1.815-0.235-2.74 0.286-3.429 2.72-6.104 5.981-6.847 0.931-0.213 1.871-0.244 2.82-0.181 0.727 0.049 1.442 0.162 2.142 0.367 1.047 0.309 1.972 0.841 2.813 1.523 0.099 0.080 0.196 0.16 0.291 0.242 0.121 0.102 0.125 0.16 0.019 0.287-0.53 0.631-1.060 1.261-1.591 1.89l-0.001 0.001c-0.264 0.315-0.529 0.63-0.795 0.944-0.007 0.009-0.014 0.018-0.020 0.027-0.029 0.039-0.061 0.081-0.111 0.111zM40.98 11.093c1.243 1.122 2.005 2.521 2.309 4.154 0.339 1.817 0.095 3.557-0.815 5.179-1.080 1.924-2.728 3.158-4.879 3.715-1.851 0.481-3.686 0.384-5.457-0.345-2.306-0.95-3.797-2.656-4.496-5-0.625-2.097-0.398-4.135 0.72-6.035 1.089-1.853 2.728-3.013 4.823-3.553 0.722-0.186 1.402-0.259 2.313-0.261 1.972 0.015 3.88 0.703 5.481 2.146zM35.031 12.848c2.195-0.005 3.63 1.218 4.022 2.914 0.237 1.022 0.132 2.015-0.376 2.943-0.597 1.090-1.529 1.725-2.782 1.866-1.212 0.138-2.27-0.201-3.134-1.064-0.554-0.553-0.888-1.227-1.030-1.987-0.18-0.964-0.069-1.897 0.405-2.762 0.698-1.274 1.813-1.885 2.895-1.909z"></path>
                  <path d="M61.554 0h48.992v32h-48.992v-32zM78.002 16.398v-7.248c0-0.025-0-0.047-0.001-0.067-0.001-0.069-0.002-0.103 0.016-0.12s0.051-0.016 0.119-0.015c0.012 0 0.025 0 0.039 0 0.008 0 0.017 0 0.026 0 0.826-0.001 1.654-0.001 2.481-0 0.413 0 0.827 0 1.24 0 0.010 0 0.020 0 0.030 0.001 0.019 0.001 0.039 0.002 0.057-0.001 0.094-0.010 0.123 0.034 0.114 0.119-0.002 0.023-0.001 0.045-0.001 0.068l0.001 0.017 0 0.017v14.48c0 0.015 0 0.029 0 0.042s0 0.027 0.001 0.039c0.001 0.068 0.002 0.103-0.015 0.121s-0.057 0.018-0.135 0.017c-0.020-0-0.043-0.001-0.069-0.001-0.818 0.001-1.637 0.001-2.455 0h-0.003c-0.409-0-0.819-0-1.228-0-0.011 0-0.023-0-0.035-0.001-0.023-0.001-0.046-0.002-0.069 0.001-0.097 0.014-0.119-0.036-0.113-0.119 0.002-0.030 0.002-0.060 0.001-0.090-0-0.015-0.001-0.031-0.001-0.046v-7.214zM98.524 8.949h-6.148c-2.047 0-4.095 0-6.14-0.002-0.016 0-0.031 0-0.046 0-0.031 0-0.061 0.001-0.092-0-0.069-0.003-0.094 0.029-0.088 0.092 0.001 0.019 0.001 0.038 0 0.057-0 0.009-0 0.019-0 0.029v3.463c0 0.099-0.003 0.144 0.018 0.165s0.069 0.016 0.171 0.016h3.861c0.126 0 0.188 0 0.219 0.031s0.031 0.090 0.031 0.208v10.677c0 0.098-0.006 0.144 0.014 0.165s0.067 0.018 0.171 0.018h3.705c0.116 0 0.173 0 0.202-0.028s0.028-0.083 0.028-0.194v-10.677c0-0.108-0.007-0.157 0.015-0.18s0.074-0.018 0.191-0.018h3.93c0.17 0 0.17 0 0.171-0.165v-3.446c0-0.119 0.007-0.171-0.017-0.194s-0.076-0.016-0.194-0.016z"></path>
                </svg>
                <div className="placeholder"></div>
                <img src={val.avatar} alt="avatar" className="avatar" />
                <p className="card-text">{val.name}</p>
                <p className="card-text">{val.tweets} tweets</p>
                <p className="card-text">{val.followers} followers</p>
                <button
                  className={
                    (val.isFollow && "follow-button follow") || "follow-button"
                  }
                  type="button"
                  onClick={() => followClick(val.id)}
                >
                  {val.isFollow ? "Following" : "Follow"}
                </button>
              </li>
            );
          })}
      </ul>
      {loadMoreDisabled && (
        <button className="load-button" type="button" onClick={loadMoreClick}>
          Load more
        </button>
      )}
    </section>
  );
};

export default TweetsPage;
