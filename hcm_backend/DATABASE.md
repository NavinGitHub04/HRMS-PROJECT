# This contains sql queries for setup database and creating tables according to the project

### Note: We are using MySQL database for this project

## Step-1: Creat a databese

```sql
CREATE DATABASE "hcm_configuration";
```

## Step-2: Create tables required in this project

```sql
CREATE TABLE hcm_configuration.hr_company (
    PK_CompanyID INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Address VARCHAR(255) NULL,
    Currency VARCHAR(10) NULL,
    CreatedAt TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    UpdatedAt TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY(PK_CompanyID)
);

CREATE TABLE hcm_configuration.hr_division (
    PK_DivID INT NOT NULL,
    FK_HR_CompanyID INT NULL,
    Name VARCHAR(100) NOT NULL,
    Description VARCHAR(255) NULL,
    CreatedAt TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    UpdatedAt TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY(PK_DivID),
    FOREIGN KEY(FK_HR_CompanyID) REFERENCES hr_company(PK_CompanyID)
);

CREATE TABLE hcm_configuration.hr_subdivision (
    PK_SubDivID INT NOT NULL,
    FK_HR_DivisionID INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Description VARCHAR(255) NULL,
    CreatedAt TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    UpdatedAt TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY(PK_SubDivID),
    FOREIGN KEY(FK_HR_DivisionID) REFERENCES hr_division(PK_DivID)
);

CREATE TABLE hcm_configuration.hr_empcat (
    PK_CatID INT NOT NULL,
    Code VARCHAR(5) NULL,
    Name VARCHAR(100) NOT NULL,
    Description VARCHAR(255) NULL,
    IsActive TINYINT(1) NULL DEFAULT 1,
    CreatedAt TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    UpdatedAt TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY(PK_CatID)
);

CREATE TABLE hcm_configuration.hr_empsubcat (
    PK_SubCatID INT NOT NULL,
    FK_HR_EmpCatID INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Description VARCHAR(255) NULL,
    CreatedAt TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    UpdatedAt TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY(PK_SubCatID),
    FOREIGN KEY(FK_HR_EmpCatID) REFERENCES hr_empcat(PK_CatID)
);

CREATE TABLE hcm_configuration.hr_orgunit (
    PK_OrgUnitID INT NOT NULL,
    ParentUnitID INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Description VARCHAR(255) NULL,
    ValidFrom DATE NULL,
    ValidTo DATE NULL,
    CreatedDate DATETIME NOT NULL,
    ModifiedDate DATETIME NOT NULL,
    PRIMARY KEY(PK_OrgUnitID),
    FOREIGN KEY(ParentUnitID) REFERENCES hr_orgunit(PK_OrgUnitID)
);

CREATE TABLE hcm_configuration.hr_job (
    PK_JobID INT NOT NULL,
    Title VARCHAR(100) NOT NULL,
    Description VARCHAR(255) NULL,
    CreatedDate DATETIME NOT NULL,
    ModifiedDate DATETIME NOT NULL,
    PRIMARY KEY(PK_JobID)
);

CREATE TABLE hcm_configuration.hr_position (
    PK_PositionID INT NOT NULL,
    FK_HR_JobID INT NOT NULL,
    FK_HR_OrgUnitID INT NOT NULL,
    Title VARCHAR(100) NOT NULL,
    ValidFrom DATE NULL,
    ValidTo DATE NULL,
    CreatedDate DATETIME NOT NULL,
    ModifiedDate DATETIME NOT NULL,
    PRIMARY KEY(PK_PositionID),
    FOREIGN KEY(FK_HR_JobID) REFERENCES hr_job(PK_JobID),
    FOREIGN KEY(FK_HR_OrgUnitID) REFERENCES hr_orgunit(PK_OrgUnitID)
);

CREATE TABLE hcm_configuration.hr_dept (
    PK_DeptID INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Code VARCHAR(5) NOT NULL UNIQUE,
    FK_HR_DeptID INT NOT NULL,
    Description VARCHAR(255) NULL,
    IsActive TINYINT(1) NULL DEFAULT 1,
    CreatedAt TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    UpdatedAt TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY(PK_DeptID),
    FOREIGN KEY(FK_HR_DeptID) REFERENCES hr_dept(PK_DeptID)
);
```

## Step-3: Insert some dummy data in each tables

```sql
INSERT INTO hcm_configuration.hr_company (PK_CompanyID, Name, Address, Currency) VALUES (1010, "Forestech", "New York", "EUR"), (1002, "Heritage", "London", "EUR"), (1033, "Olive Inc", "Cambrige", "USD"), (1019, "Intel Inc", "Caneda", "EUR");

INSERT INTO hcm_configuration.hr_division (PK_DivID, FK_HR_CompanyID, Name, Description) VALUES (1202, 1010, "Sales", "Sales Dept"), (1002, 1002, "Marketing", "Marketing Dept"), (1677, 1033, "Executive", "Executive Dept"), (1353, 1019, "Management", "Management Dept");

INSERT INTO hcm_configuration.hr_subdivision (PK_SubDivID, FK_HR_DivisionID, Name, Description) VALUES (1515, 1202, "Sales ...", "Sales Dept"), (1514, 1002, "Marketing ...", "Marketing Dept"), (1518, 1677, "Executive ...", "Executive Dept"), (4145, 1353, "Management ...", "Management Dept");

INSERT INTO hcm_configuration.hr_empcat (PK_CatID, Code, Name, Description, IsActive) VALUES (1010, "10A1", "Developer", "Descrip...", 0), (1002, "10Z1", "Manager", "Descrip ...", 1), (1033, "10W1", "CRM", "Descrip ...", 1), (1019, "10R1", "Engineer", "Descrip ...", 0);

INSERT INTO hcm_configuration.hr_empsubcat (PK_SubCatID, FK_HR_EmpCatID, Name, Description) VALUES (1726, 1010, "Developer", "Descrip..."), (4551, 1002, "Manager", "Descrip ..."), (5244, 1033, "CRM", "Descrip ..."), (4554, 1019, "Engineer", "Descrip ...");

INSERT INTO hcm_configuration.hr_orgunit (PK_OrgUnitID, ParentUnitID, Name, Description, ValidFrom, ValidTo, CreatedDate, ModifiedDate) VALUES (1010, 1010, "Electical", "Description ...", "2025-04-22", "2025-07-22", "2025-04-22", "2025-04-22"), (1023, 1010, "Hydraulics", "Description ...", "2024-04-22", "2025-07-22", "2024-04-22", "2024-04-22"), (1745, 1023, "Automobiles", "Description ...", "2025-04-22", "2025-07-22", "2025-04-22", "2025-04-22");

INSERT INTO hcm_configuration.hr_job (PK_JobID, Title, Description, CreatedDate, ModifiedDate) VALUES (1010, "Sales", "Description for sales", "2025-07-19", "2025-07-19"), (1045, "Management", "Description for management", "2024-07-19", "2024-07-19"), (1078, "CRM", "Description for customer relationships", "2025-04-30", "2025-05-19"), (1632, "Executive", "Description for executive", "2025-01-19", "2025-02-19");

INSERT INTO hcm_configuration.hr_position (PK_PositionID, FK_HR_JobID, FK_HR_OrgUnitID, Title, ValidFrom, ValidTo, CreatedDate, ModifiedDate) VALUES (1475, 1010, 1023, "Senior", "2024-07-21", "2025-05-21", "2024-07-21", "2024-07-21"), (4585, 1045, 1745, "Junior", "2024-07-21", "2025-09-21", "2024-07-21", "2024-07-21"), (5845, 1632, 1010, "Manager", "2024-02-21", "2025-05-21", "2024-07-21", "2024-07-21");

INSERT INTO hcm_configuration.hr_dept (PK_DeptID, Name, Code, FK_HR_DeptID, Description, IsActive) VALUES (1010, "Marketing", "11A4", 1010, "NA", 0), (1045, "Designing", "17AB", 1010, "NA", 0), (1698, "Testing", "01Q4", 1045, "NA", 1);
```

### After run all these sql commands you are ready to test each endpoints!