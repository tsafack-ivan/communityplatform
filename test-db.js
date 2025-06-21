const { PrismaClient } = require('@prisma/client')

async function testConnection() {
  const prisma = new PrismaClient()
  
  try {
    console.log('Testing database connection...')
    // Try to connect to the database
    await prisma.$connect()
    console.log('Successfully connected to the database!')
    
    // Try a simple query
    const userCount = await prisma.user.count()
    console.log(`Current user count: ${userCount}`)
  } catch (error) {
    console.error('Database connection error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection() 