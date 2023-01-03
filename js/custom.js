/*!
 * Item: Kitzu
 * Description: Personal Portfolio Template
 * Author/Developer: Exill
 * Author/Developer URL: https://themeforest.net/user/exill
 * Version: v2.0.0
 * License: Themeforest Standard Licenses: https://themeforest.net/licenses
 */

/*----------- CUSTOM JS SCRIPTS -----------*/

$('[data-github]').each(function () {
  var _this = this;
  var repo = $(_this).data('github')

  fetch('https://api.github.com/repos/' + repo).then(function (response) {
    return response.json();
  }).then(function (response) {
    $(_this).find('[data-forks]').text(response.forks);
    $(_this).find('[data-stars]').text(response.stargazers_count);
  });
});
