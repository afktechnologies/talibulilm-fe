import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // In production, send to backend API
    // const res = await fetch('https://api.talibulilm.in/qna/ask', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    
    // For now, simulate success
    console.log('QnA Question Submitted:', formData);
    
    return NextResponse.json({ 
      success: true, 
      message: "Your question has been submitted successfully. Our scholars will review it soon, InshaAllah." 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: "Failed to submit question. Please try again." 
    }, { status: 500 });
  }
}