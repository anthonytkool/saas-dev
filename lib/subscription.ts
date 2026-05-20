import { auth } from '@clerk/nextjs/server';

export type PlanType = 'free' | 'pro';

export async function getUserPlan(): Promise<PlanType | null> {
  // 1. ดึงทั้ง userId (เช็คว่าล็อกอินไหม) และ has (เช็คแผน) มาพร้อมกัน
  const { userId, has } = await auth();

  // 2. [ด่านแรกสำคัญสุด!] ถ้าไม่มี userId แปลว่ายังไม่ได้ล็อกอิน ให้ส่งกลับเป็น null ทันที
  if (!userId) {
    return null;
  }

  // 3. ปลอดภัยแล้ว ชัวร์ว่าล็อกอินแน่ๆ ค่อยมาเช็คแผนต่อ
  if (typeof has === 'function') {
    if (has({ plan: 'pro_plan' })) return 'pro';
    if (has({ plan: 'free_user' })) return 'free';
  }

  return null;
}
export async function checkProPlan(): Promise<boolean> {
  const plan = await getUserPlan();
  return plan === 'pro';
}
