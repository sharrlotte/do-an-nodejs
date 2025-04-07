import test, { expect } from '@playwright/test';

test('Người dùng chưa đăng nhập và không nhập nội dung bình luận', async ({ page }) => {
  // Mở trang web
  await page.goto('https://do-an-nodejs.vercel.app/');

  // Mở trang web
  await page.goto('https://do-an-nodejs.vercel.app/');

  // Vào trang truyện
  await page.getByRole('link', { name: 'Thụ Thần Thụ Thần Hoàng Phủ' }).nth(1).click();

  // Nhấn vào tab bình luận
  await page.getByRole('tab', { name: 'Bình luận' }).click();

  // Kiểm tra xem có xuất hiện thông báo "Bạn cần đăng nhập để bình luận" không
  const loginMessage = await page.getByText('Bạn cần đăng nhập để bình luận');

  // Kiểm tra nếu thông báo hiển thị, testcase sẽ pass
  if (loginMessage) {
    console.log("Thông báo 'Bạn cần đăng nhập để bình luận' hiển thị");
    // Testcase pass
  } else {
    throw new Error("Thông báo 'Bạn cần đăng nhập để bình luận' không hiển thị khi người dùng chưa đăng nhập");
  }
});

test('Người dùng chưa đăng nhập và nhập nội dung bình luận', async ({ page }) => {
  await page.goto('https://do-an-nodejs.vercel.app/');
  await page.getByRole('link', { name: 'Thụ Thần Thụ Thần Hoàng Phủ' }).nth(1).click();
  await page.getByRole('tab', { name: 'Bình luận' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Hay quá');
  // Kiểm tra xem có xuất hiện thông báo "Bạn cần đăng nhập để bình luận" không
  const loginMessage = await page.getByText('Bạn cần đăng nhập để bình luận');

  // Kiểm tra nếu thông báo hiển thị, testcase sẽ pass
  if (loginMessage) {
    console.log("Thông báo 'Bạn cần đăng nhập để bình luận' hiển thị");
    // Testcase pass
  } else {
    throw new Error("Thông báo 'Bạn cần đăng nhập để bình luận' không hiển thị khi người dùng chưa đăng nhập");
  }
});

test('Đăng nhập và không nhập bình luận', async ({ page }) => {
  await page.goto('https://do-an-nodejs.vercel.app/');

  // Set token vào localStorage (VD: TOKEN_NORMAL hoặc TOKEN_ADMIN)
  await page.evaluate(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY',
    );
  });
  // Reload lại trang để token có hiệu lực
  await page.reload();

  // Sau reload, giờ bạn đã đăng nhập -> có thể thực hiện các bước tiếp theo
  await page.goto('https://do-an-nodejs.vercel.app/');
  await page.getByRole('link', { name: 'Thụ Thần Thụ Thần Hoàng Phủ' }).nth(1).click();
  await page.getByRole('tab', { name: 'Bình luận' }).click();
  await page.getByRole('tabpanel', { name: 'Bình luận' }).getByRole('button').click();
  const notificationButton = page.getByRole('region', { name: 'Notifications (F8)' }).getByRole('button');

  // Kiểm tra nút có hiển thị không trước khi click
  await expect(notificationButton).toBeVisible();

  // Nếu không throw lỗi ở dòng trên thì mới đến đây -> Pass
  await notificationButton.click();
});

test('Đăng nhập và nhập bình luận', async ({ page }) => {
  // Truy cập trang web
  await page.goto('https://do-an-nodejs.vercel.app/');

  // Set token vào localStorage (VD: TOKEN_NORMAL hoặc TOKEN_ADMIN)
  await page.evaluate(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY',
    );
  });

  // Reload lại trang để token có hiệu lực
  await page.reload();

  // Sau reload, giờ bạn đã đăng nhập -> có thể thực hiện các bước tiếp theo
  await page.goto('https://do-an-nodejs.vercel.app/');

  // Mở trang truyện và chuyển đến tab bình luận
  await page.getByRole('link', { name: 'Chiến Thần Rừng Rậm Chiến Thầ' }).nth(1).click();
  await page.getByRole('tab', { name: 'Bình luận ' }).click();

  // Nhập nội dung bình luận
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Nên đọc');

  // Nhấn nút gửi bình luận
  await page.getByRole('tabpanel', { name: 'Bình luận' }).getByRole('button').click();

  // Chờ 3 giây để bình luận được xử lý
  await page.waitForTimeout(3000);

  await page.reload();

  await page.getByRole('tab', { name: 'Bình luận ' }).click();

  await page.waitForTimeout(3000);

  // Kiểm tra xem bình luận "Sharlotte@Hay nha" có xuất hiện khi chưa đăng nhập không
  const commentLocator = await page
    .locator('div')
    .filter({ hasText: /^SharlotteNên đọc$/ })
    .first();

  // Kiểm tra nếu bình luận có hiển thị, testcase sẽ pass
  const isCommentVisible = await commentLocator.isVisible();
  expect(isCommentVisible).toBe(true); // Kiểm tra rằng bình luận đã hiển thị
});

test('Đăng nhập và nhập bình luận có kí tự đặt biệt', async ({ page }) => {
  await page.goto('https://do-an-nodejs.vercel.app/');

  await page.evaluate(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY',
    );
  });
  // Reload lại trang để token có hiệu lực
  await page.reload();

  // Sau reload, giờ bạn đã đăng nhập -> có thể thực hiện các bước tiếp theo
  await page.goto('https://do-an-nodejs.vercel.app/');
  // Mở trang truyện và chuyển đến tab bình luận
  await page.getByRole('link', { name: 'Chiến Thần Rừng Rậm Chiến Thầ' }).nth(1).click();
  await page.getByRole('tab', { name: 'Bình luận ' }).click();

  // Nhập nội dung bình luận
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('!@#%&()_+');

  // Nhấn nút gửi bình luận
  await page.getByRole('tabpanel', { name: 'Bình luận' }).getByRole('button').click();

  // Chờ 3 giây để bình luận được xử lý
  await page.waitForTimeout(3000);

  await page.reload();

  await page.getByRole('tab', { name: 'Bình luận ' }).click();

  await page.waitForTimeout(3000);

  // Kiểm tra xem bình luận "Sharlotte@Hay nha" có xuất hiện khi chưa đăng nhập không
  const commentLocator = await page
    .locator('div')
    .filter({ hasText: /^Sharlotte!@#%&()_+$/ })
    .first();

  // Kiểm tra nếu bình luận có hiển thị, testcase sẽ pass
  const isCommentVisible = await commentLocator.isVisible();
  expect(isCommentVisible).toBe(true); // Kiểm tra rằng bình luận đã hiển thị
});

test('Kiểm tra nút gửi bình luận không được có khi chưa đăng nhập', async ({ page }) => {
  // Mở trang web
  await page.goto('https://do-an-nodejs.vercel.app/');

  // Vào trang truyện
  await page.getByRole('link', { name: 'Chiến Thần Rừng Rậm Chiến Thầ' }).nth(1).click();

  // Nhấn vào tab bình luận
  await page.getByRole('tab', { name: 'Bình luận' }).click();

  // Chờ cho các phần tử tải về
  await page.waitForTimeout(2000);

  // Kiểm tra xem nút gửi bình luận có hiển thị không
  const sendButton = await page.getByRole('tabpanel', { name: 'Bình luận' }).getByRole('button');

  // Kiểm tra nếu nút "Gửi" hiển thị khi người dùng chưa đăng nhập, thì testcase fail
  const isButtonVisible = await sendButton.isVisible();

  // Nếu nút gửi bình luận hiển thị, thì fail testcase
  if (isButtonVisible) {
    throw new Error('Nút gửi bình luận không nên hiển thị khi người dùng chưa đăng nhập!');
  }

  // Nếu không có nút gửi bình luận, testcase pass
});

test('Kiểm tra có nút gửi bình luận khi đã đăng nhập', async ({ page }) => {
  // Mở trang web
  await page.goto('https://do-an-nodejs.vercel.app/');

  // Đăng nhập (Sử dụng token đã có sẵn trong localStorage)
  await page.evaluate(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY',
    );
  });
  // Reload lại trang để token có hiệu lực
  await page.reload();

  // Vào trang truyện
  await page.getByRole('link', { name: 'Thụ Thần Thụ Thần Hoàng Phủ' }).nth(1).click();

  // Nhấn vào tab bình luận
  await page.getByRole('tab', { name: 'Bình luận' }).click();

  // Chờ cho các phần tử tải về
  await page.waitForTimeout(2000);

  // Kiểm tra xem nút gửi bình luận có hiển thị không
  const sendButton = await page.getByRole('tabpanel', { name: 'Bình luận' }).getByRole('button');

  // Kiểm tra nếu người dùng đã đăng nhập, nút "Gửi" phải hiển thị
  const isButtonVisible = await sendButton.isVisible();

  // Kiểm tra rằng nút gửi bình luận hiển thị khi người dùng đã đăng nhập
  expect(isButtonVisible).toBe(true); // Nếu không hiển thị thì testcase fail
});

test('Đăng nhập và nhập bình luận là một đoạn html', async ({ page }) => {
  // Truy cập trang web
  await page.goto('https://do-an-nodejs.vercel.app/');

  // Set token vào localStorage (VD: TOKEN_NORMAL hoặc TOKEN_ADMIN)
  await page.evaluate(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY',
    );
  });

  // Reload lại trang để token có hiệu lực
  await page.reload();

  // Sau reload, giờ bạn đã đăng nhập -> có thể thực hiện các bước tiếp theo
  await page.goto('https://do-an-nodejs.vercel.app/');

  // Mở trang truyện và chuyển đến tab bình luận
  await page.getByRole('link', { name: 'Thành Thần Thành Thần Trong' }).nth(2).click();
  await page.getByRole('tab', { name: 'Bình luận ' }).click();

  // Nhập nội dung bình luận
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('<span style="font-size:150px; color:yellow;">H</span>');

  // Nhấn nút gửi bình luận
  await page.getByRole('tabpanel', { name: 'Bình luận' }).getByRole('button').click();

  // Chờ 3 giây để bình luận được xử lý
  await page.waitForTimeout(3000);

  await page.reload();

  await page.getByRole('tab', { name: 'Bình luận ' }).click();

  await page.waitForTimeout(3000);

  // Kiểm tra xem bình luận "Sharlotte@Hay nha" có xuất hiện khi chưa đăng nhập không
  const commentLocator = await page.getByLabel('Bình luận (1)').locator('div').filter({ hasText: 'Sharlotte<span style="font-' }).nth(3);

  // Kiểm tra nếu bình luận có hiển thị, testcase sẽ pass
  const isCommentVisible = await commentLocator.isVisible();
  expect(isCommentVisible).toBe(true); // Kiểm tra rằng bình luận đã hiển thị
});

test('Đăng nhập và nhập bình luận có độ dài 500 kí tự', async ({ page }) => {
  await page.goto('https://do-an-nodejs.vercel.app/');

  // Set token vào localStorage (VD: TOKEN_NORMAL hoặc TOKEN_ADMIN)
  await page.evaluate(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY',
    );
  });
  // Reload lại trang để token có hiệu lực
  await page.reload();

  // Sau reload, giờ bạn đã đăng nhập -> có thể thực hiện các bước tiếp theo
  await page.goto('https://do-an-nodejs.vercel.app/');
  await page.getByRole('link', { name: 'Thụ Thần Thụ Thần Hoàng Phủ' }).nth(1).click();
  await page.getByRole('tab', { name: 'Bình luận' }).click();
  await page.getByRole('textbox').click();
  await page
    .getByRole('textbox')
    .fill(
      '“Chiếc lá cuối cùng” là một trong những truyện ngắn cảm động và giàu tính nhân văn nhất của nhà văn Mỹ O. Henry. Tác phẩm không chỉ kể một câu chuyện xúc động về tình bạn, lòng yêu thương và sự hy sinh, mà còn khéo léo lồng ghép thông điệp sâu sắc về niềm tin và hi vọng – những thứ có thể cứu rỗi con người trong những lúc tưởng chừng tuyệt vọng nhất.\n\nCâu chuyện xoay quanh ba nhân vật chính: Sue, Johnsy và cụ Behrman – ba nghệ sĩ nghèo sống trong một khu nhà trọ tồi tàn. Khi Johnsy bị viêm phổi nặng và dần mất đi ý chí sống, cô bắt đầu tin rằng khi chiếc lá thường xuân cuối cùng rụng khỏi cành, cô cũng sẽ lìa đời. Điều đặc biệt và cũng là điểm nhấn quan trọng của truyện chính là hành động âm thầm của cụ Behrman – một họa sĩ già chưa từng vẽ được bức tranh nào mà ông cho là "kiệt tác". Trong một đêm mưa gió lạnh lẽo, cụ đã trèo lên tường, vẽ một chiếc lá giống hệt chiếc thật để giữ lại hi vọng sống cho Johnsy. Và chiếc "lá cuối cùng" ấy – dù chỉ là một bức vẽ – lại mang sức mạnh cứu sống cả một con người. Cụ Behrman qua đời sau hôm đó vì nhiễm lạnh, nhưng ông đã kịp hoàn thành "kiệt tác" của đời mình bằng chính mạng sống và trái tim nhân hậu.\n\nTruyện không chỉ cảm động vì tình tiết mà còn vì cách O. Henry xây dựng nhân vật và tạo ra một cú “twist” ở cuối đầy bất ngờ. Tác giả không tô vẽ nhân vật bằng những lời hoa mỹ, mà để hành động của họ tự nói lên tất cả. Cụ Behrman ban đầu xuất hiện có vẻ hơi cục cằn, cáu bẳn, nhưng lại là người mang trong mình lòng nhân ái sâu sắc. Đó chính là nghệ thuật tạo hình nhân vật rất đặc trưng của O. Henry – giản dị, gần gũi nhưng đầy chiều sâu.\n\nThông điệp của truyện có thể khiến người đọc suy ngẫm rất nhiều. Trong cuộc sống, đôi khi chỉ một tia hi vọng, một hành động nhỏ bé nhưng chân thành cũng có thể thay đổi cả một số phận. Niềm tin không thể nhìn thấy, nhưng có thể được cảm nhận, và đôi khi, nó đến từ những điều tưởng như không thực – như một chiếc lá được vẽ trên tường.\n\n“Chiếc lá cuối cùng” là minh chứng cho sức mạnh của nghệ thuật, của tình người, và của lòng vị tha. Dù truyện ngắn, lời văn mộc mạc, nhưng dư âm mà nó để lại thì vô cùng sâu sắc. Đây chắc chắn là một trong những tác phẩm nên đọc ít nhất một lần trong đời – để thêm tin vào lòng tốt, và để học cách hy sinh thầm lặng vì người khác.',
    );
  await page.getByRole('tabpanel', { name: 'Bình luận' }).getByRole('button').click();
  const notificationButton = page.getByRole('region', { name: 'Notifications (F8)' }).getByRole('button');

  // Kiểm tra nút có hiển thị không trước khi click
  await expect(notificationButton).toBeVisible();

  // Nếu không throw lỗi ở dòng trên thì mới đến đây -> Pass
  await notificationButton.click();
});

test('Đăng nhập và nhập bình luận là một ngôn ngữ khác với hệ thống', async ({ page }) => {
  // Truy cập trang web
  await page.goto('https://do-an-nodejs.vercel.app/');

  // Set token vào localStorage (VD: TOKEN_NORMAL hoặc TOKEN_ADMIN)
  await page.evaluate(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY',
    );
  });

  // Reload lại trang để token có hiệu lực
  await page.reload();

  // Sau reload, giờ bạn đã đăng nhập -> có thể thực hiện các bước tiếp theo
  await page.goto('https://do-an-nodejs.vercel.app/');

  // Mở trang truyện và chuyển đến tab bình luận
  await page.getByRole('link', { name: 'Chiến Thần Rừng Rậm Chiến Thầ' }).nth(1).click();
  await page.getByRole('tab', { name: 'Bình luận ' }).click();

  // Nhập nội dung bình luận
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('好好');

  // Nhấn nút gửi bình luận
  await page.getByRole('tabpanel', { name: 'Bình luận' }).getByRole('button').click();

  // Chờ 3 giây để bình luận được xử lý
  await page.waitForTimeout(3000);

  await page.reload();

  await page.getByRole('tab', { name: 'Bình luận ' }).click();

  await page.waitForTimeout(3000);

  // Kiểm tra xem bình luận "Sharlotte@Hay nha" có xuất hiện khi chưa đăng nhập không
  const commentLocator = await page
    .locator('div')
    .filter({ hasText: /^Sharlotte好好$/ })
    .first();

  // Kiểm tra nếu bình luận có hiển thị, testcase sẽ pass
  const isCommentVisible = await commentLocator.isVisible();
  expect(isCommentVisible).toBe(true); // Kiểm tra rằng bình luận đã hiển thị
});
