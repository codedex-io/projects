# Codédex Projects: Contribution Guide 👩🏻‍💻👨🏾‍💻👩🏼‍💻

Welcome to the [Codédex Projects](https://www.codedex.io/projects) GitHub repo! 

Thank you for your interest in contributing a project tutorial for Codédex. 🫶

## Why Contribute?

Why should you contribute to Codédex? Contributing will get you: 

- 💪 Valuable technical writing and real-world coding experience for your personal portfolio.
- 👩🏻‍🏫 Mentorship from the Codédex team to support your project tutorial.
- 📈 Ability to publish your tutorials and grow your online presence on sites such as Dev.to, Twitter, Hacker News, and LinkedIn.
- 👩‍❤️‍👨 Access to Codédex premium features such as the Discord server and community events.
- 👕 Free swag from the [Codédex merch shop](https://codedex.myshopify.com).

## How to Contribute

1. Open an issue [here](https://github.com/codedex-io/projects/issues) with the title “Project Tutorial - Name” and follow the auto-generated issue content. The team will get back to you about your issue, either to approve your topic or to suggest a different one.
2. Once your project topic is accepted by the Codédex team, you can now start writing it!
3. Make a copy of the [Codédex project tutorial mdx template](https://github.com/codedex-io/projects/blob/main/project-template.mdx), the content guidelines, the [mdx docs](https://mdxjs.com/docs/), and this 
[completed project](https://github.com/codedex-io/projects/blob/main/projects/generate-a-qr-code-with-python/generate-a-qr-code-with-python.mdx) 
to see what a final project should look like. Check your work using [insert mdx editor] to make sure it renders properly.
4. If you encounter any issues, feel free to reach out to [@sonnynomnom](https://www.twitter.com/sonnynomnom).
5. When you finish your project tutorial, create a pull request [here](https://github.com/codedex-io/projects/pulls), referencing the issue. The Codédex team will review your PR and give you reviews and suggestions.
6. Once your project tutorial is completed, your PR will be merged, and you can publish your project tutorial on the site of your choice!

## How do I submit a Pull Request (PR)?

1. Fork [this repository](https://github.com/codedex-io/projects).
2. Clone the forked repository to your computer.
3. Create and switch into a new branch.
4. Create a new folder with your project tutorial **.mdx** file in it.
5. Make a pull request to merge your fork with this repository.

## Content Guidelines

To ensure the quality of our project tutorials, all tutorials must abide by these content guidelines: 

- Your project tutorial topic must be the one agreed upon in your issue.
- All the content you create is your own work, and not plagiarized from other sources.
- All code created is adequately commented or explained.
- Your project tutorial should correctly render in `mdx`.
- Each project should have a full complete project solution code in a code block towards the bottom of the project. The name of the file should be in a comment on line 1. If there are multiple files, there should be multiple code blocks. 

## Metadata

| Variable Name    | Description    | Example |
| ---------------- | ---------------------------------------------- | ------------------------------------ |
| `title`          | The title of the project.   | title: Gernate a QR Code with Python |
| `author`         | The author of the project.  | author: Jerry Zhu |
| `datePublished`  | The published date in `YYYY-MM-DD`.  | dataPublished: 2022-09-19 |
| `description`    | A brief description (ideally under 150 characters) used in search engine results and content previews  | description: Learn how to make a QR code using the qrcode library in this project tutorial                                                            |
| `header` | The header image that shows up at the top of the project. You can keep this blank. | header: URL |
| `tags`           | Key words that are relevant to the entry. You can see a list of tags below. 2 tags per project. | tags:<br /> - python<br /> - beginner<br />|

## Tags

- python
- beginner
- intermediate
- advanced

## Difficulties

Our projects are divided into three difficulties:

- `beginner`: Projects for code newbies and people who have just finished "The Legend of Python" course.
- `intermediate`: Projects that are for less experienced programmers. These projects should contain some more difficult concepts, but should still be understandable by most programmers. 
- `advanced`: Projects that are for experienced programmers. Projects can contain advanced concepts and paradigms.

## Formatting

- Subheadings are title cased: Setting Up
- File names are bolded: **hello_world.py**
- Function names have (): `print()`
- Method names have the dot operator: `.insert()`
- Python strings should be single quotes.
- Python indentation is two spaces.

If a project tutorial does not follow these guidelines, we will request changes in order for the tutorial to meet these guidelines. If you do not comply, the PR will be marked as invalid and closed.
