export function getRouter(
  publishSecretUri: string,
  fetchController: Function,
  confirmationController: Function,
  authorController: Function,
  loadingController: Function
) {
  return new Map([
    ['GET', new Map([
      ['/favicon.ico', (_: any, response: any) => { response.end(); }],
      ['/fetch', fetchController],
      ['/decrypt', loadingController],
      [publishSecretUri, authorController]
    ])],
    ['POST', new Map([
      [publishSecretUri, confirmationController]
    ])]
  ]);
}
