import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import ArticleCard from '../../Component/ArticleCard';
import Carousel from 'react-bootstrap/Carousel'
import Loading from '../../Component/Loading';
import './index.scss';

import headerImageFirst from '../../assets/frame_1.svg'
import headerImageSecond from '../../assets/frame_2.svg'
import headerImageThird from '../../assets/frame_3.svg'


const HomePage = () => {
    const [companyList, setCompanyList] = useState([]);
    const [recentArticles, setRecentArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadData = useCallback(() => {
        const apiUrl_companyList = '/api/v1/article/getAllCompanies';
        const apiUrl_allArticle = '/api/v1/article';
        axios.all([
            axios.get(apiUrl_companyList),
            axios.get(apiUrl_allArticle)
        ])
            .then(axios.spread((res1, res2) => {
                setCompanyList(res1.data.data);
                setRecentArticles(res2.data.articles)
                setLoading(false);
            }));
    }, []);

    useEffect(() => {
        loadData()
    }, [loadData])

    const replaceHTMLTags=(str)=>{
        str = str.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ');
        return str.replace(/<\/?[^>]+(>|$)/g, "")
    }

    return (
        <div className="home-page-container container-fluid my-2 d-flex flex-column justify-content-between">
            <div className="d-flex flex-md-row flex-column m-0 p-0 mb-3">
                <div className="col-12 order-md-2 col-md-6  container d-flex flex-column justify-content-around">
                    {/* <img src={headerImage} alt="Anubhav"/> */}
                    <Carousel indicators={false}>
                        <Carousel.Item className="carousel-item" interval={3000}>
                            <img
                                className="d-block w-100 mx-auto"
                                src={headerImageFirst}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item className="carousel-item" interval={3000}>
                            <img
                                className="d-block w-100 mx-auto"
                                src={headerImageSecond}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item className="carousel-item" interval={3000}>
                            <img
                                className="d-block w-100 mx-auto"
                                src={headerImageThird}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                    <p className="homepagePara mx-auto mt-4 text-center">Anubhav: Experience Sharing Point (A-ESP) is a platform developed for AITians to read & share encounters of various interviews.<span className="hide-for-small">Anyone from AIT can submit their experience on A-ESP to guide others on their way to the next interview. All submitted articles are categorized on the basis of the interviewer company. Anubhav also helps you to request your seniors to share their experience here.</span></p>
                </div>
                <div className="col-md-3 order-md-1 col-12 " >
                    <div className="title-bar d-flex">
                        <span className="title flex-grow-1 mb-2">Company List</span>
                            {/* <Link to='/allCompany'>Show all</Link> */}
                    </div>
                    <ul className="list-group company-list">
                        
                        {
                            (loading) ? (
                                <div className="list-group-item d-flex justify-content-between align-items-center list-box" ><Loading />
                                </div>

                            ) : (
                                    companyList.map((item, index) => {
                                        return (
                                            <Link key={index} to={`/interview/${item.company}`} className="list-group-item col-12 p-1 px-3 d-flex  justify-content-between align-items-center list-box my-1" >
                                                <div className="col-11"><img src={item.domainName} alt="logo" className="companyLogoImg rounded-circle"></img>{item.company}</div>
                                                <span className="col-1 badge badge-secondary badge-pill text-center">{item.count}</span>
                                            </Link>
                                        )
                                    })
                                )
                        }

                    </ul>
                </div>
                <div className="col-3  order-md-3 hide-for-small ">
                    <div className="title-bar d-flex">
                        <span className="title flex-grow-1 mb-2">Recent Articles</span>
                    </div>
                    <ul className="list-group company-list recentArticleCards">
                        
                        {
                            (loading) ? (
                                <div className="list-group-item d-flex justify-content-between align-items-center list-box" ><Loading />
                                </div>

                            ) : (
                                    recentArticles.map((item, index) => {
                                        return (
                                            <ArticleCard
                                                key={index}
                                                id={item._id}
                                                title={item.title}
                                                description={replaceHTMLTags(item.description)}
                                                name={(item.showName) ? `${item.author.name}` : ' AITian '}
                                                date={item.createdAt}
                                                tags={item.articleTags}
                                            />
                                        )
                                    })


                                )
                        }

                    </ul>

                </div>
            </div>
            <div className="align-self-center text-center" style={{fontWeight:"700"}}>Made with ❤️ by <Link to='/developers'><u>OSS Club</u> </Link> only for AITians.
            </div>
        </div >
    )
}

export default HomePage
