// import "../styles/index.scss";
import "../styles/style.css";
import axios from "axios";

const openSource = {
  githubConvertedToken: "c547c8df3e5d04654bf56db7ea04cb339058daa1",
  githubUserName: "ecigwe",
};

const query_pr = `
	query {
	  user(login: "${openSource.githubUserName}"){
	    pullRequests(last: 100, orderBy: {field: CREATED_AT, direction: DESC}){
      totalCount
      nodes{
        id
        title
        url
        state
	      mergedBy {
	          avatarUrl
	          url
	          login
	      }
	      createdAt
	      number
        changedFiles
	      additions
	      deletions
        baseRepository {
	          name
	          url
	          owner {
	            avatarUrl
	            login
	            url
	          }
	        }
      }
    }
	}
}
	`;
const axiosGitHubGraphQL = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: "bearer " + openSource.githubConvertedToken,
  },
});

const onFetchFromGitHub = () => {
  axiosGitHubGraphQL.post("", { query: query_pr }).then((data) => {
    // const result = `<li class="repo__list__container">
    //   <div class="repo__right__list__left">
    //     <h3><a href="#">react project</a></h3>
    //     <div class="repo__right__content">
    //       <span class="repo__right__language">javascript </span>
    //       <span>updated 20hr ago</span>
    //     </div>
    //   </div>
    //   <div class="repo__right__list__right">
    //     <div>star</div>
    //   </div>
    // </li>`;
    // document.getElementById("result").innerHTML = result;
    console.log(data.data.data.user.pullRequests.nodes);
    let result = "";
    data.data.data.user.pullRequests.nodes.forEach((resultfromgithub) => {
      result += `<li class="repo__list__container">
      <div class="repo__right__list__left">
        <h3><a href="#">${resultfromgithub.baseRepository.name}</a></h3>
        <div class="repo__right__content">
          <span class="repo__right__language">javascript </span>
          <span>updated 20hr ago</span>
        </div>
      </div>
      <div class="repo__right__list__right">
        <div>star</div>
      </div>
    </li>`;
      document.getElementById("result").innerHTML = result;
    });
  });
};
onFetchFromGitHub();
