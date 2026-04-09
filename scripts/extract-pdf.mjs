import { pdf } from 'pdf-to-img'
import { mkdir, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public', 'source-material')

async function extractPdf(pdfPath, outputDir, prefix) {
  await mkdir(outputDir, { recursive: true })
  const doc = await pdf(pdfPath, { scale: 2 })
  let i = 1
  for await (const page of doc) {
    const outPath = join(outputDir, `${prefix}-page-${String(i).padStart(2, '0')}.png`)
    await writeFile(outPath, page)
    console.log(`  ✓ ${prefix} page ${i}/${doc.length}`)
    i++
  }
}

await extractPdf(
  'C:\\Users\\costco\\OneDrive\\Desktop\\ClaudeWorkspace\\TSA_Drone_UAV_Portfolio_2026_v2.pdf',
  join(publicDir, 'fpv-competition-drone'),
  'drone-portfolio'
)

await extractPdf(
  'C:\\Users\\costco\\OneDrive\\Desktop\\ClaudeWorkspace\\ESN - Engineering Notebook.pdf',
  join(publicDir, 'engineering-notebooks'),
  'esn-notebook'
)

console.log('\nDone!')
