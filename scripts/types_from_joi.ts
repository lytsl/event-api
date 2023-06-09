import { convertFromDirectory } from 'joi-to-typescript'

async function types(): Promise<void> {
  console.log('Running joi-to-typescript...')

  const result = await convertFromDirectory({
    schemaDirectory: './src/models',
    typeOutputDirectory: './src/types',
    debug: true,
  })

  if (result) {
    console.log('Completed joi-to-typescript')
  } else {
    console.log('Failed to run joi-to-typescript')
  }
}

types()
