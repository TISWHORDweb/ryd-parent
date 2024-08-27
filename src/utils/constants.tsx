export const homeTabs = [
    { name: 'Profiles', icon: 'profile.svg', id: 0 },
    { name: 'Activity', icon: 'activity.svg', id: 1 },
    { name: 'Children', icon: 'profile.svg', id: 2 }
];

export const Days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat",]
export const Times = ["00:00AM", "1:00AM", "2:00AM", "3:00AM", "4:00AM", "5:00AM", "6:00AM", "7:00AM", "8:00AM", "9:00AM", "10:00AM", 
"11:00AM", "12:00PM", "13:00PM", "14:00PM", "15:00PM", "16:00PM", "17:00PM", "18:00PM", "19:00PM", "20:00PM", "21:00PM",
"22:00PM", "23:00PM"];

export const curriculum = {
    l1_basic: 'https://drive.google.com/file/d/1MhtzIU4dDwfH07LJZShDGmCQkP1xSSsj/view?usp=sharing',
    l1_advanced: 'https://drive.google.com/file/d/1jUrR2fisXL1sdduJR2Vpex4hjzVH1yxX/view?usp=sharing',
    l2_basic: 'https://drive.google.com/file/d/1jkNaq5gKRgFTjonmzgJ9B-T_3WlY4cMc/view?usp=sharing',
    l2_advanced: '',
    l3_basic: 'https://drive.google.com/file/d/1zdusl9lStagwiJt8jVqws1HvV2DoVC0Y/view?usp=sharing',
    l3_advanced: '',
}

export function formatDate() {
  
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    
    function getDaySuffix(day:number) {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
    
    const daySuffix = getDaySuffix(day);
    const formattedDate = `${day}${daySuffix} ${month} ${year}`;
    return formattedDate;
}

export const setCertificateData = (data:any) => {
    const certificateData = JSON.stringify(data);
    sessionStorage.removeItem('certificateData');
    sessionStorage.setItem('certificateData', certificateData);
  };
  
  export function getCertificateData() {
    const certificateData = sessionStorage.getItem('certificateData');
  
    if (certificateData) {
      return JSON.parse(certificateData);
    } else {
      return null;
    }
  }