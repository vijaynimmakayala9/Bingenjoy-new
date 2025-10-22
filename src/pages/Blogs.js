import React from "react";
import { blogs } from "./BlogData";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./Blogs.css";

const Blogs = () => {
    return (
        <>
            <Header />
            <div className="blogs-wrapper">
                <div className="container py-5 mt-5">
                    <div className="text-center mb-5">
                        <h1 className="display-4 fw-bold title">Cinematic Celebrations</h1>
                        <p className="lead text-muted subtitle">
                            Discover how BingeNJoy transforms ordinary moments into extraordinary memories
                        </p>
                    </div>

                    <div className="row g-4">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="col-lg-4 col-md-6 col-sm-12">
                                <Link to={`/blogs/${blog.slug}`} className="text-decoration-none">
                                    <div className="blog-card h-100">
                                        <div className="blog-image">
                                            <img
                                                src={blog.featuredImage}
                                                className="w-100"
                                                alt={blog.title}
                                            />
                                        </div>
                                        <div className="blog-content p-4">
                                            <div className="d-flex justify-content-between mb-2 meta">
                                                <span className="author">By {blog.author}</span>
                                                <span className="date">{blog.date}</span>
                                            </div>
                                            <h3 className="h5 mb-3 title-sm">{blog.title}</h3>
                                            <p className="excerpt mb-4">{blog.excerpt}</p>
                                            <div className="d-flex justify-content-center">
                                                <span className="btn btn-purple rounded-pill px-4 py-2">
                                                    Read Experience →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blogs;