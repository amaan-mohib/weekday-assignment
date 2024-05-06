export interface IListing {
  jdUid: string;
  jdLink: string;
  jobDetailsFromCompany: string;
  maxJdSalary: number | null;
  minJdSalary: number | null;
  salaryCurrencyCode: string;
  location: string;
  minExp: number;
  maxExp: number;
  jobRole: string;
  companyName: string;
  logoUrl: string;
}

const limit = 20;

export const apiCaller = async (page = 1) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit,
      offset: (page - 1) * limit,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );
    const result = await response.json();
    return result as {
      jdList: IListing[];
      totalCount: number;
    };
  } catch (error) {
    console.log(error);
    return {
      jdList: [],
      totalCount: 0,
    };
  }
};

export const debounce = (func: (...args: any) => void, timeout = 300) => {
  let timer: number | undefined;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};
