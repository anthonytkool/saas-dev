import { auth, currentUser } from '@clerk/nextjs/server';
// เปลี่ยนมาเรียกใช้ checkProPlan แทน
import { checkProPlan } from '@/lib/subscription';

export default async function Home() {
  // ด่านที่ 1: ตรวจก่อนเลยว่าล็อกอินหรือยัง? (สำคัญที่สุด เอาขึ้นก่อน)
  const { userId } = await auth();
  if (!userId) {
    return <div className='text-9xl'>Sign in to view this page</div>;
  }

  // ด่านที่ 2: ล็อกอินผ่านแล้ว ค่อยมาเช็คว่าเป็น Pro ไหม
  const isProUser = await checkProPlan();

  // ถ้า "ไม่ใช่" Pro user (!isProUser) ให้ไล่ไปสมัครสมาชิก
  if (!isProUser) {
    return <h1 className='text-7xl'>Please sign up for Pro Plan </h1>;
  }

  // ด่านสุดท้าย: ผ่านหมดทุกเงื่อนไข ยินดีต้อนรับ!
  const user = await currentUser();
  return <div className='text-7xl'>Welcome, {user?.firstName}!</div>;
}
