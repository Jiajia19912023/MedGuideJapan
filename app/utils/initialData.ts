import { AppState, LeaveMasterEntry, User, LeaveRequest } from '@/app/types';
import { calcYearsOfService, getPaidLeaveDaysFromMaster, toDateString } from '@/app/utils/vacation';

// デフォルト有給マスタ（厚生労働省の最低基準に準拠）
const DEFAULT_MASTER: LeaveMasterEntry[] = [
  { yearsOfService: 0, daysGranted: 10 },
  { yearsOfService: 1, daysGranted: 11 },
  { yearsOfService: 2, daysGranted: 12 },
  { yearsOfService: 3, daysGranted: 14 },
  { yearsOfService: 4, daysGranted: 16 },
  { yearsOfService: 5, daysGranted: 18 },
  { yearsOfService: 6, daysGranted: 20 },
];

function makeUser(
  id: string,
  name: string,
  pin: string,
  hireDate: string,
  master: LeaveMasterEntry[]
): User {
  const years = calcYearsOfService(hireDate);
  return {
    id,
    name,
    pin,
    hireDate,
    isAdmin: false,
    grantedPaidLeaveDays: getPaidLeaveDaysFromMaster(years, master),
  };
}

// 今月 + 翌月のダミー申請を生成
function makeDummyRequests(users: User[]): LeaveRequest[] {
  const today = new Date();
  const requests: LeaveRequest[] = [];
  let counter = 0;

  const addReq = (
    userId: string,
    userName: string,
    year: number,
    month: number,
    day: number,
    type: '希望休' | '有給'
  ) => {
    const date = toDateString(new Date(year, month, day));
    requests.push({
      id: `init_${counter++}`,
      userId,
      userName,
      date,
      type,
      createdAt: new Date().toISOString(),
    });
  };

  const y = today.getFullYear();
  const m = today.getMonth();

  // user001 – 田中 花子
  addReq('user001', '田中 花子', y, m, 5, '希望休');
  addReq('user001', '田中 花子', y, m, 12, '有給');
  addReq('user001', '田中 花子', y, m, 20, '希望休');

  // user002 – 山田 美咲
  addReq('user002', '山田 美咲', y, m, 5, '希望休');
  addReq('user002', '山田 美咲', y, m, 15, '希望休');
  addReq('user002', '山田 美咲', y, m + 1, 3, '有給');

  // user003 – 佐藤 愛
  addReq('user003', '佐藤 愛', y, m, 5, '有給');
  addReq('user003', '佐藤 愛', y, m, 18, '希望休');
  addReq('user003', '佐藤 愛', y, m + 1, 10, '希望休');

  // user004 – 鈴木 直美
  addReq('user004', '鈴木 直美', y, m, 10, '希望休');
  addReq('user004', '鈴木 直美', y, m, 20, '希望休');
  addReq('user004', '鈴木 直美', y, m + 1, 5, '有給');

  // user005 – 中村 理恵
  addReq('user005', '中村 理恵', y, m, 5, '希望休');   // 5日は4名希望 → 赤
  addReq('user005', '中村 理恵', y, m, 20, '希望休');  // 20日は3名希望 → 赤
  addReq('user005', '中村 理恵', y, m, 25, '有給');

  // 無効な日付（月が存在しない日）をフィルタ
  return requests.filter(r => {
    const d = new Date(r.date);
    return !isNaN(d.getTime());
  });
}

export function getInitialData(): AppState {
  const master = DEFAULT_MASTER;
  const users: User[] = [
    makeUser('user001', '田中 花子', '1111', '2022-04-01', master),
    makeUser('user002', '山田 美咲', '2222', '2024-04-01', master),
    makeUser('user003', '佐藤 愛',   '3333', '2020-04-01', master),
    makeUser('user004', '鈴木 直美', '4444', '2018-04-01', master),
    makeUser('user005', '中村 理恵', '5555', '2023-04-01', master),
  ];

  const leaveRequests = makeDummyRequests(users);

  return {
    users,
    leaveRequests,
    leaveMaster: master,
    currentUserId: null,
  };
}
