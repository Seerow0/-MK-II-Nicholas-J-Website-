# Welcome to Nick's Github_pages for dummies(well this dummy in particular). 😁

[Website](https://seerow0.github.io/testing/)

We will be starting with the Portfolyou theme and breaking it down into a personal website(because to do so from scratch would require every free second of my free time which I use for fun activities and sleep). Along the way, I will add any helpful tips and references here to access it for my delightful self in the future. 

[Forked Theme](https://youssefraafatnasry.github.io/portfolYOU/docs/)

# Good references for comparing code to see what I can do like other people who forked the repository and made made creative changes.
[V-Reference1](https://github.com/vishalgattani/vishalgattani.github.io)

[B-Reference2]( https://github.com/bernhardrieder/bernhardrieder.github.io)

# First and foremost, 
the **`config.yml**` file is important for melding your website together. An important note is for baseurl:, you are going to want to add the name of the repository like the example shown below. Otherwise, the website will not work. In this case, my repository is named "testing". (for now)

baseurl: "/testing" 

There are other customizable features on the config such as the description which changes the text that appears on the landing page below the image. There is also the matter of adding an image. In order to add an image, a simple way would be to add a folder in your repository for images. In my case I have two seperate folders, one for images and one for gifs. Then when you navigate to the folder and open the image in a new tab, you will obtain the raw link which will look something like this.  **`https://raw.githubusercontent.com/Seerow0/testing/main/gifs/nic.gif`**
You will add this link to the **`config.yml`** where it says images and the image should appear on the website.

You should be able to drag and drop as well which I find is better for video content and it is more convenient to host the images in your repository folder. 

# Adding Images to MD files (Markdown)
**`![text](URL)`** Gif Example Below


![Example](https://github.com/Seerow0/testing/blob/main/gifs/nic.gif)

# Changing the Logo that appears on the tab section of your website

This file is located in the assets folder like so: **`assets/favicon.ico`**
The favicon is a small icon on your tab bar but also serves as an important visual identity. 
To replace the logo, simply attatch a new file and delete the old "favicon.ico" 
Generate your own using [favicon](https://favicon.io/) or any other tool.
1. Copy your new `favicon.ico` file into your own project with the same file path **`assets/favicon.ico`**.

# Changing the emoji on the light mode and dark mode toggle button.

Navigate to **`theme.scss`** 
Line: "@include themed(content, "🌙", "🌞");"
Alternativley, you can search through the index on the top right and look for the current emoji featured on the website location. Honestly, if you spot the emojis, your in the right place unless your some mad lad with a knack for adding emojis all over your code, then you'd be looking for **`@include themed(content, "[Emoji]", "[Emoji]");`**

# Video Content
`25 mb` video limit
To add videos to pages, drag and drop the video into the script. You also can format it to fit to a certain size with code but unfortunatley like my spelling, I can't recall. Will research later.

# Fill and Color For Projects and Posts
You'll notice on the blog page where the posts are diffrenitiated by color(excuse my spelling nick ol chap) (no worries nick thoughts ol' chap)
You could edit the color values using the image below. 
![image](https://github.com/Seerow0/web2/assets/92154813/1b9572da-10a3-4cbf-8e61-b2b7caca2a9e)

`style: fill`
`color: primary`

I am sure there are more ways to edit these values but unfortunatley I do not need more than what I already have provided right now. sad piano music plays

# Color text in markdown
[Source](https://github.com/orgs/community/discussions/31570)

`$${\color{text}colorvalue}$$` 
Example: `$${\color{lightblue}Light \space Blue}$$`

$${\color{lightblue}Light \space Blue}$$

# Removing theme watermark
`footer.html` contains the portfolyou theme logo on the right that redirects you to the theme/comment it out or reformat it into another link if needed

# Adding a logo for a page on the navbar instead of a name

`documentation/github.md` I'll use this as an example since it already exists. I changed the existing github logo to a book icon for now. I was told it would make a good table of contents page to link to the other pages, good idea.

You will replace the `fa fa` symbol with something from [this](https://fontawesome.com) website. 

A good example is `<i class="fa fa book fa-1x fa-book"></i>` Bascally find these values on the site and replace them with the new provided fa fa text and you can modify the `1x` up to `4x`. 

This site also provided you with logos for social media links. 
You can type in fa to locate the scripts in which you need to change what symbol appears on the website. Previously, the bottom used to say <> with (heart emoj) but I changed that to The Nick Signal. Located in `_includes/footer.html`

`footer.html` obviously enough displays information at the bottom of the page.

# Hot Tips 

1.) ** ** for bolding and `` for highlighting and combinging both gives you bolded highlight ` comes after the first ** and before the last **

2.) To use gifs or images, get the raw link by copying the image address raw link on the image and pasting it in browser, then copying the link you get on landing page.


# Scavenge Section 

`For information to be written later into the main read.md`

