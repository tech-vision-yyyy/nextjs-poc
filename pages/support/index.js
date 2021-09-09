import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/client";

import MainHeader from "../../components/MainHeader";

const title = "Support";

export default function Support() {
  const [session] = useSession();
  const [projectName, setProjectName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/api/issues/create`, {
      method: "POST",
      body: JSON.stringify({ projectName, shortDescription, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setProjectName("");
    setShortDescription("");
    setDescription("");
  };

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>{title}</title>
      </Head>
      <MainHeader email={session.user.email}></MainHeader>
      <h1 className="my-3">Report an Issue</h1>
      <Link href="/home">
        <a className="simple-link">Back</a>
      </Link>
      <div>
        <form className="mt-6 support-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="input-project-name">Project Name (optional)</label>
            <input
              id="input-project-name"
              type="text"
              name="project-name"
              className="form-input"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              maxLength="140"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="input-short-description">Short Description</label>
            <input
              id="input-short-description"
              type="text"
              name="short-description"
              className="form-input"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              maxLength="140"
              required
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="input-description">
              Description (Max 2000 characters)
            </label>
            <textarea
              id="input-description"
              name="description"
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="2000"
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

Support.auth = true;
