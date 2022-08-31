export function render(body: string): string {
  return `
    <!doctype html>
      <head>
        <meta charset="utf-8">
        <title>One Time Secret</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
        <style>
        body {
          background: #58595B }
        section {
          background: #070808;
          color: white;
          font-family: 'Roboto', sans-serif;
          border-radius: 1em;
          padding: 3em;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-right: -50%;
          transform: translate(-50%, -50%) }
        section .middle {
          display: block;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }

        button{
            width: 270px;
            height: 80px;
            border: none;
            outline: none;
            background: #568DA7;
            color: #fff;
            font-size: 22px;
            border-radius: 40px;
            text-align: center;
            box-shadow: 0 6px 20px -5px rgba(0,0,0,0.4);
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }
        
        .check-box{
            width: 80px;
            height: 80px;
            border-radius: 40px;
            box-shadow: 0 0 12px -2px rgba(0,0,0,0.5);
            position: absolute;
            top: 0;
            right: -40px;
            opacity: 0;
        }
        
        .check-box svg{
            width: 40px;
            margin: 20px;
        }
        
        svg path{
            stroke-width: 3;
            stroke: #fff;
            stroke-dasharray: 34;
            stroke-dashoffset: 34;
            stroke-linecap: round;
        }
        
        .active{
            background: linear-gradient(140deg,#0a243f,#8edff9);
            transition: 1s;
        }
        
        .active .check-box{
            right: 0;
            opacity: 1;
            transition: 1s;
        }
        
        .active p{
            margin-right: 125px;
            transition: 1s;
        }
        
        .active svg path{
            stroke-dashoffset: 0;
            transition: 1s;
            transition-delay: 1s;
        }
        </style>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
      </head>

      <body>
        <section>
          <div class="middle">
            <img src="https://yt3.ggpht.com/ytc/AKedOLT9caa-QIsWHFScwY3U6smIGlE0l_hrmWp6fLV_Ag=s800-c-k-c0x00ffffff-no-rj" width="200" height="200"></img>
            <br/><h1>ZONOS ENCRYPT</h1>
          </div>
          <p>
            ${body}
          </p>
        </section>  
      </body>
    </html>
  `.trim();
}
