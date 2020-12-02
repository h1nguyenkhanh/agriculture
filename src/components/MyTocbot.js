import React, {useEffect} from "react";
import tocbot from 'tocbot';
import marked from "marked";
import TurndownService from "turndown"



function MyTocbot() {
    useEffect(()=>{
        tocbot.init({
            // Where to render the table of contents.
            tocSelector: '.js-toc',
            // Where to grab the headings to build the table of contents.
            contentSelector: '.js-toc-content',
            // Which headings to grab inside of the contentSelector element.
            // headingSelector: 'h1, h2, h3',
            // For headings inside relative or absolute positioned containers within content.
            hasInnerContainers: true,
            collapseDepth: 6,
            orderedList: false,
            listClass: 'toc-list',
         });

         markDemo()

    },[])

    function markDemo() {
        var turndownService = new TurndownService()
 
        var markdown = turndownService.turndown('<h1><span style="font-size: 24pt;"><strong>321 mxvv ggg</strong><h2>s  </h2></span></h1><h1><span style="font-size: 24pt;"><strong>321 mxvv ggg</strong></span></h1>')

        marked.setOptions({
            headerIds: true
          });
        // const markdownString = `<h1><span style="font-size: 24pt;"><strong>321 mxvv ggg</strong></span></h1>`
        console.log(marked(markdown));
    }


  return (
    <div>
      <h1>asdas</h1>
            <div style={{
                position: "fixed",
                width: '200px',
                top: '50px',
                right: '30px',
                height: "auto",
                zIndex: 100,
                overflow: 'hidden'               
            }}>
              <div  className="js-toc"></div>
            </div>

      <div className="js-toc-content">
        <h1 id="1">Section 1</h1>
        <p style={{height: '1500px'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          hendrerit euismod dui, nec fermentum urna porta ultrices. Nullam sed
          vestibulum purus, in auctor libero. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas dolor
          metus, molestie nec eros non, suscipit efficitur erat. Nulla ante
          odio, tristique sed nisi id, ultrices vulputate magna. Nunc congue
          nibh non lorem ultricies congue. Donec non metus vitae purus semper
          interdum eget a augue. Nullam sem ante, finibus eget sapien ultricies,
          pretium accumsan felis. Donec eget nulla orci.
        </p>
        <h1 id="2">Section 2</h1>
        <p style={{height: '1500px'}}>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          hendrerit euismod dui, nec fermentum urna porta ultrices. Nullam sed
          vestibulum purus, in auctor libero. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas dolor
          metus, molestie nec eros non, suscipit efficitur erat. Nulla ante
          odio, tristique sed nisi id, ultrices vulputate magna. Nunc congue
         
        </p>
        <h2 id="3">Section 3</h2>
        <p style={{height: '1500px'}}>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          hendrerit euismod dui, nec fermentum urna porta ultrices. Nullam sed
          vestibulum purus, in auctor libero. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas dolor
          
        </p>
        {/* <h3 id="4">Section 4</h3> */}
        <h1 id="4">test h1</h1>
        <p style={{height: '1500px'}}>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          hendrerit euismod dui, nec fermentum urna porta ultrices. Nullam sed
          vestibulum purus, in auctor libero. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas dolor
          
        </p>
        <h2 id="5">omg</h2>
        <p style={{height: '1500px'}}>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          hendrerit euismod dui, nec fermentum urna porta ultrices. Nullam sed
          vestibulum purus, in auctor libero. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas dolor
          
        </p>
      </div>


    </div>
  );
}

export default MyTocbot;
