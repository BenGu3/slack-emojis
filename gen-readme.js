const path = require('path')
const fs = require('fs/promises')

const emojisDirectoryName = 'emojis'
const directoryPath = path.join(__dirname, emojisDirectoryName)
const readmeFilename = 'README.md'
const readmeFilenamePath = path.join(__dirname, readmeFilename)

async function main() {
  const readmeContent = await generateReadmeContent()
  await fs.writeFile(readmeFilenamePath, readmeContent)
}

const generateReadmeContent = async () => {
  const emojiFiles = await fs.readdir(directoryPath)
  const imageTags = emojiFiles.map(generateImageTag)

  return generateMarkdown(imageTags)
}

const generateMarkdown = imageTags => `# slack-emojis

<span>
\t${imageTags.join('\n\t')}
</span>
`

const generateImageTag = filename => {
  const imagePath = `${emojisDirectoryName}/${filename}`
  return `<img src="${imagePath}" width="30" />`
}

main()
  .catch(console.error)
