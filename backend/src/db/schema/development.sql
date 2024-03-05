INSERT INTO USERS (ID, FIRSTNAME, LASTNAME, EMAIL, USER_PASSWORD, CITY, VOLUNTEER_HOURS)
VALUES 
  (1, 'John', 'Smith', 'John.Smith@user.com', "1234", 'Toronto', 34),
  (2, 'Alice', 'Jones', 'Alice.Jones@user.com', "1234", 'Vancouver'),
  (3, 'Sita', 'Dennis', 'Sita.Dennis@user.com', "1234", 'Ottawa'),
  (4, 'Sasha', 'Berkenstock', 'Sash.Berkenstock@user.com', "1234", 'Montreal'),
  (5, 'Crystal', 'Johnson', 'Crystal.Johnson@user.com', "1234", 'Toronto'),
  (6, 'Frederick', 'Williams', 'Fred.Will@user.com', "1234", 'Vancouver'),
  (7, 'Sarah', 'Garcia', 'Sarah.Garcica@user.com', "1234", 'Montreal'),
  (8, 'Robert', 'Rodriguez', 'Rob.R@user.com', "1234", 'Ottawa'),
  (9, 'Phillip', 'Martinez', 'Phillip.Martinez@user.com', "1234", 'Vancouver'),
  (10, 'Brittany', 'Taylor', 'Brit.Tay@user.com', "1234", 'Toronto');

INSERT INTO EVENTS (ID, EVENT_NAME, EVENT_DETAILS, START_TIME, EVENT_HOURS, EVENT_STATUS, EVENT_ADDRESS, CITY, EVENT_DATE, CREATOR_ID)
VALUES 
  (1, 'Race Setup', 'We need help setting up water stations for a marathon', '1:00PM', 4, 'INCOMPLETE', '456 status Hall Road', 'Montreal', '2024-06-01', 7),
  (2, 'Meals on Wheels', 'We need help delivering meals to at risk clients in the community', '10:00AM', 7, 'INCOMPLETE', '5 Union Court Street', 'Vancouver', '2024-06-15',9),
  (3, 'Ottawa Fair', 'We need people to run the info booth', '9:00AM', 8, 'INCOMPLETE', '123 Order Drive', 'Ottawa', '2024-06-11', 8),
  (4, 'Annual Petting Zoo', 'We need people to check tickets at the door', '2:00PM', 4, 'INCOMPLETE', '476 Talus Drive', 'Vancouver', '2024-06-02', 2),
  (5, 'Street Party Fundraiser', 'We require first aid attendants', '10:00AM', 4, 'INCOMPLETE', '1 Main Street', 'Montreal', '2024-06-22', 4);
