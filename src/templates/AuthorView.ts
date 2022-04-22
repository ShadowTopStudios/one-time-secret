import { render as baseView } from './BaseView';

export function render(url: string): string {
  const view = `
    <form action='${url}' id="encryptForm" method='POST'>
      <label for=secret>Secret</label>
      <br>
      <textarea rows=20 cols=80 name="secret"></textarea>
      <br>
      <label for=ttl>Expires in:</label>
      <br>
      <select name="ttl" id="ttl">
        <option type="number" value=604800000>7 days</option>
        <option type="number" value=86400000>1 day</option>
        <option type="number" value=3600000>1 hour</option>
        <option type="number" value=900000>15 minutes</option>
      </select>
    </form>
    <br>
    <br>
    <div class="middle">
      <button id="btn">
          <p id="btnText">Create Link</p>
          <div class="check-box">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                  <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
          </div>
      </button>
    </div>

    <script type="text/javascript">
      const btn = document.querySelector("#btn");
      const btnText = document.querySelector("#btnText");

      btn.onclick = () => {
          btnText.innerHTML = "Generating";
          btn.classList.add("active");
          document.forms['encryptForm'].submit();
      };
    </script>
  `.trim();
  return baseView(view);
}
/*
note on expiration time: 
  24.8 days = 604800000
  and is NodeJS upper limit on delay time.
  Exceeding value causes node to execute
  in 1 ms
*/