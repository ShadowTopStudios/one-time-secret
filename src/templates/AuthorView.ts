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
      <br>
      <br>
      

    </form>
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
<input type="submit" value="Create Link">
<input type="number" name="ttl" value=2147483647 min=0 max=2147483647>
<br>
    <br>
    <table>
      <thead>
        <tr>
          <th>Milliseconds</th>
          <th>Same as</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>60000</td>
          <td>1 minute</td>
        </tr>
        <tr>
          <td>900000</td>
          <td>15 minutes</td>
        </tr>
        <tr>
          <td>3600000</td>
          <td>1 hour</td>
        </tr>
        <tr>
          <td>28800000</td>
          <td>8 hours</td>
        </tr>
        <tr>
          <td>86400000</td>
          <td>1 day</td>
        </tr>
        <tr>
          <td>604800000</td>
          <td>7 day</td>
        </tr>
        <tr>
          <td>2147483647</td>
          <td>
              24.8 days, <br>
              NodeJS upper limit on delay time. <br>
              Exceeding value causes node to execute <br>
              in 1 ms
          </td>
        </tr>
      </tbody>
    </table>
    */