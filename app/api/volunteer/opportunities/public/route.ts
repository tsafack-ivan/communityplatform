import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const opportunities = await prisma.volunteerOpportunity.findMany({
      where: {
        status: 'OPEN',
        organization: {
          status: 'APPROVED'
        }
      },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            logo: true,
            description: true
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    const formattedOpportunities = opportunities.map(opp => ({
      id: opp.id,
      title: opp.title,
      description: opp.description,
      date: opp.date,
      location: opp.location,
      requiredSkills: opp.requiredSkills,
      status: opp.status,
      organization: {
        id: opp.organization.id,
        name: opp.organization.name,
        logo: opp.organization.logo,
        description: opp.organization.description
      },
      createdAt: opp.createdAt
    }));

    // If no opportunities exist, return sample data for testing
    if (formattedOpportunities.length === 0) {
      return NextResponse.json([
        {
          id: "sample-1",
          title: "Teaching Assistant",
          description: "Help children with their studies and provide additional support in classrooms. You'll work with students in small groups and assist teachers with lesson preparation.",
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
          location: "Yaounde, Cameroon",
          requiredSkills: ["Teaching experience", "Patience", "Good communication skills"],
          status: "OPEN",
          organization: {
            id: "sample-org-1",
            name: "Hope Foundation",
            logo: "/images/education.jfif",
            description: "Providing education to underserved communities"
          },
          createdAt: new Date().toISOString()
        },
        {
          id: "sample-2",
          title: "Community Health Worker",
          description: "Assist in health awareness campaigns and basic health check-ups. You'll help organize health education sessions and support community health initiatives.",
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
          location: "Douala, Cameroon",
          requiredSkills: ["Basic health knowledge", "Community engagement", "First aid training"],
          status: "OPEN",
          organization: {
            id: "sample-org-2",
            name: "Water for Life",
            logo: "/images/water.jfif",
            description: "Improving access to clean water and healthcare"
          },
          createdAt: new Date().toISOString()
        },
        {
          id: "sample-3",
          title: "Food Distribution Volunteer",
          description: "Help in organizing and distributing food supplies to needy families. You'll assist with food packaging, distribution logistics, and community outreach.",
          date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks from now
          location: "Bamenda, Cameroon",
          requiredSkills: ["Physical fitness", "Team player", "Organizational skills"],
          status: "OPEN",
          organization: {
            id: "sample-org-3",
            name: "Food Bank",
            logo: "/images/food.avif",
            description: "Combating hunger and food insecurity"
          },
          createdAt: new Date().toISOString()
        }
      ]);
    }

    return NextResponse.json(formattedOpportunities);
  } catch (error) {
    console.error('Error fetching volunteer opportunities:', error);
    return NextResponse.json(
      { error: 'Error fetching volunteer opportunities' },
      { status: 500 }
    );
  }
} 