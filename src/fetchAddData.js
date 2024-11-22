//'supersecrettoken_for_user1'
export function fetchAddData(token, newData) {
  const url =
    'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/create';

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': token,
    },
    body: JSON.stringify(newData),
  }).then(
    (val) => {
      console.log(val);
      return val;
    },
    (err) => console.log('Упс')
  );
}

// fetchAddData('supersecrettoken_for_user1', {
//   companySigDate: '2022-12-23T11:19:27.017Z\t',
//   companySignatureName: 'test',
//   documentName: 'test',
//   documentStatus: 'test',
//   documentType: 'test',
//   employeeNumber: 'test',
//   employeeSigDate: '2022-12-23T11:19:27.017Z\t',
//   employeeSignatureName: 'test',
// });
