module.exports = {
  processNotes: (blocks) => {
    let outputHTML = '';
    blocks.forEach((block, i) => {
      switch(block.type) {
        case 'paragraph': {
          const { text } = block.data;
          outputHTML += `<p>${text}</p>`;
          break;
        }
        case 'header': {
          const { text } = block.data;
          outputHTML += `<h1>${text}</h1>`;
          break;
        }
        case 'list': {
          let listItems = '';
          block.data.items.forEach(item => {
            listItems += `<li>${item}</li>`;
          });
          outputHTML += `<ol>${listItems}</ol>`;
          break;
        }
        default: return;
      }
      
    });
    return outputHTML;
  }
};