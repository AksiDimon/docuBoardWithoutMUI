export function fetchEdit(token, id, changedData) {
  const url = `https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/set/${id}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': token,
    },
    body: JSON.stringify(changedData),
  })
  .then((val) => val.json())
  .then(console.log)
}

// fetchEdit(
//   'supersecrettoken_for_user1',
//   'e59d8b35-fc40-4ad1-89a0-1f14d5cc35f5',
//   {
//     companySigDate: '2022-02-01T03:00:00.000Z',
//     companySignatureName: 'Крутая Контора',
//     documentName: 'Накладная',
//     documentStatus: 'Задекларирована',
//     documentType: 'PDF',
//     employeeNumber: '2341',
//     employeeSigDate: '2022-01-30T03:00:00.000Z',
//     employeeSignatureName: 'BEST.sig',
//     // id: '8fb8c358-c1f6-4c77-8e18-c1c091c1f74c',
//   }
// );
