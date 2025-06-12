window.onload = function() 
{
  __sveltekit_1vcw6v2 = {
    base: new URL("..", location).pathname.slice(0, -1),
    env: {}
  };

  const element = document.getElementById("my-content");

  const data = [null,null];

  Promise.all([
    import("../_app/immutable/entry/start.e5d749bf.js"),
    import("../_app/immutable/entry/app.6c76c798.js")
  ]).then(([kit, app]) => {
    kit.start(app, element, {
      node_ids: [0, 3],
      data,
      form: null,
      error: null
    });
  });
}
