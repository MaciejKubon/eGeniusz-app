export interface subject {
  id: number;
  name: string;
}
export interface level {
  id: number;
  level: string;
}
export interface subject_level {
  id: number;
  name: string;
}
export interface linkButton {
  path: string;
  text: string;
}
export interface loginData {
  email: string | null;
  password: string | null;
  accountType: number;
}
export interface userDetail {
  firstName: string | null;
  lastName: string | null;
  birthday: string | null;
}
export interface teacherDetail {
  firstName: string | null;
  lastName: string | null;
  birthday: string | null;
  description: string | null;
}
export interface teacherLesson {
  id: number;
  teacher_id: number;
  subject_id: number;
  subject_level_id: number;
  subject: subject;
  subject_level: subject_level;
  price: number;
}
export interface lessonSet {
  subject_id: string | null;
  subject_level_id: string | null;
  price: string | null;
}
export interface select {
  id: number;
  name: string;
}
export interface teacherList {
  id: number;
  firstName: string;
  lastName: string;
  subjects: string[];
  price: number[];
}
export interface teacherFiltr {
  subjects_id: string[];
  levels_id: string[];
  minPrice: number;
  maxPrice: number;
}
export interface classes {
  id: number;
  terms_id: number;
  student_id: number;
  lesson_id: number;
  confirmed: boolean;
}
export interface term {
  id: number;
  startTime: Date;
  endTime: Date;
  status: boolean;
  diffTime: number | null;
  posTop: number | null;
  classes: classes | null;
}

export interface terms {
  dayTime: Date;
  terms: term[];
}

export interface dataRange {
  start_date: string;
  end_date: string;
}
export interface termRequest {
  start_date: Date;
  end_date: Date;
  id: number;
  classes: classes | null;
}
export interface termsRequest {
  dayTime: Date;
  terms: termRequest[];
}
export interface AddNewTerm {
  isNull: boolean;
  times: dataRange;
}
export interface teacherData {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  birthday: string;
  lesson: {
    id: number;
    subject_id: number;
    subject_level_id: number;
    teacher_id: number;
    price: number;
    subject: {
      id: number;
      name: string;
    };
    subject_level: {
      id: number;
      name: string;
    };
  }[];
}
export interface newClasses {
  terms_id: number;
  lesson_id: number;
}
export interface studentClasses {
  id: number;
  lesson: {
    id: number;
    price: number;
    subject: subject;
    subject_level: subject_level;
  };
  term: {
    id: number;
    start_date: Date;
    end_date: Date;
    teacher: {
      id: 1;
      firstName: string;
      lastName: string;
    };
    diffTime: number | null;
    posTop: number | null;
  };
  confirmed: boolean;
}
export interface termsClass {
  dayTime: Date;
  terms: termRequest[];
  classes: studentClasses[];
}
export interface termsAndClasses {
  dayTime: Date;
  terms: term[];
  classes: studentClasses[];
}
export interface classesDetal {
  id: number;
  confirmed: boolean;
  terms: {
    id: number;
    teacher_id: number;
    start_date: Date;
    end_date: Date;
  };
  lesson: {
    id: number;
    subject: {
      id: number;
      name: string;
    };
    subject_level: {
      id: number;
      name: string;
    };
    price: number;
  };
  student: {
    id: number;
    firstName: string;
    lastName: string;
  };
}
export interface classes {
  id: number;
  date: string;
  confirmed: boolean;
  lesson: {
    id: number;
    subject: {
      id: number;
      name: string;
    };
    subject_level: {
      id: number;
      name: string;
    };
    price: number;
  };
  term: {
    id: number;
    teacher: {
      id: number;
      firstName: string;
      lastName: string;
    };
    start_date: string;
    end_date: string;
  };
}
export interface teacherClasses {
  id: number;
  start_date: string;
  end_date: string;
  classes: {
    id: number;
    student: {
      id: number;
      firstName: string;
      lastName: string;
    };
    lesson: {
      id: number;
      subject: {
        id: number;
        name: string;
      };
      subject_level: {
        id: number;
        name: string;
      };
      price: number;
    };
    confirmed: boolean;
  };
}
export interface classesRange {
  start_date: string;
  end_date: string;
  confirmed: boolean;
}
