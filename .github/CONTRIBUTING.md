# Codédex Projects: Contribution Guide 👩🏻‍💻👨🏾‍💻👩🏼‍💻

Welcome to the [Codédex Projects](https://www.codedex.io/projects) GitHub repo! 

Thank you for your interest in contributing a project tutorial for Codédex. 🫶

## Why Contribute?

Why should you contribute to Codédex? Contributing will get you: 

- 💪 Valuable technical writing and real-world coding experience that you can provide examples of for your personal portfolio.
- 👩🏻‍🏫 Mentorship from the Codédex team to support your project tutorial.
- 📈 Ability to publish your tutorials and grow your online presence on sites such as [Dev.to](https://dev.to/), [X(Twitter)](https://x.com), [Hacker News](https://news.ycombinator.com/), and [LinkedIn](https://www.linkedin.com/).
- 👩‍❤️‍👨 Access to Codédex premium features such as the Discord server and community events.
- 👕 Free swag from the [Codédex merch shop](https://codedex.myshopify.com).

## How to Contribute

1. Open an issue [here](https://github.com/codedex-io/projects/issues) with the title “Project Tutorial - Name” and follow the auto-generated issue content. The team will get back to you about your issue, either to approve your topic or to suggest a different one.
2. Once your project topic is accepted by the Codédex team, you can now start writing it!
3. Make a copy of the [project template](https://github.com/codedex-io/projects/blob/main/docs/project_template.mdx), then review our [content guidelines](https://github.com/codedex-io/projects/tree/main/docs/content_guidelines.mdx), the [official MDX docs](https://mdxjs.com/docs/), and 
[one of our published projects](https://github.com/codedex-io/projects/blob/main/projects/generate-a-qr-code-with-python/generate-a-qr-code-with-python.mdx) 
To see what a final project should look like and ensure that it renders properly, use an MDX previewer like [this one](https://mdxjs.com/playground/).
4. If you encounter any issues, feel free to reach out to [@sonnynomnom](https://www.twitter.com/sonnynomnom).
5. When you finish your project tutorial, [create a pull request](https://github.com/codedex-io/projects/pulls), referencing the issue. The Codédex team will then review your PR and give suggestions.
6. Once your project tutorial is completed, your PR will be merged. From there, you can publish your project tutorial on the site of your choice!

## How do I submit a Pull Request (PR)?

1. Fork [this repository](https://github.com/codedex-io/projects).
2. Clone the forked repository to your computer.

```bash
git clone https://github.com/[your-GitHub-username]/projects.git
```

3. Change into the `projects` directory with `cd projects`.
4. Create and switch into a new branch with `git checkout -b new-branch-name`.
5. Create a new folder with your project tutorial `.mdx` file in it (the names should match).
6. Add your project content to the folder you made, including text (`.mdx`), media (`.jpg`, `.png`, etc.), and code examples (`.html`, `.css`, `.py`, etc.).
7. Set your file(s) up for a commit with `git add` followed by the file(s).
8. Commit and push your changes to your remote repo with the following:

```bash
git commit -m "a descriptive commit message"
git push -u origin new-branch-name
```

9. After pushing the changes, go back to your fork on GitHub and there should be a prompt to create a new pull request.

![Prompt For a New Pull Request](https://raw.githubusercontent.com/codedex-io/projects/main/docs/prompt_for_new_pr.png)
