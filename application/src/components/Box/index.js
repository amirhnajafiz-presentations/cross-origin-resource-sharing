import React from "react";

import './index.css';

class Box extends React.Component {
    render() {
        function sortFunc(a, b) {
            return b.stargazers_count - a.stargazers_count
        }

        let array = [];
        Object.keys(this.props.userInformation).forEach((key) => {
            array.push(this.props.userInformation[key])
        })

        array.sort(sortFunc)

        return(
            <div className={"response"}>
                  {
                      array.map((repo) => (
                          <div className={"row"}>
                              <h3>
                                  {repo.full_name}
                              </h3>
                              <p className={"row-des"}>
                                  {repo.description}
                              </p>
                              <ul className={"list"}>
                                  {
                                      repo.topics.map((topic) => (
                                          <li className={"list-item"}>
                                              {topic}
                                          </li>
                                      ))
                                  }
                              </ul>
                              <div className={"row-opt"}>
                                  <small>
                                      {repo.language}
                                  </small>
                                  <small>
                                      Stars: {repo.stargazers_count}
                                  </small>
                                  <small>
                                      <a
                                          className={"row-link"}
                                          href={repo.html_url}
                                          target={"_blank"}
                                          rel={"noreferrer"}
                                      >
                                        Repo link
                                      </a>
                                  </small>
                              </div>
                          </div>
                      ))
                  }
            </div>
        )
    }
}

export default Box;