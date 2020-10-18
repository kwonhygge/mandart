module.exports = function (passport, User) {
  const express = require('express');
  const bcrypt = require('bcryptjs');
  const router = express.Router();
  const { forwardAuthenticated } = require('./auth');

  router.get('/login', forwardAuthenticated, function (req, res) {
    res.render('login', { type: 'auth' });
  });

  router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/main',
      failureRedirect: '/auth/login',
      failureFlash: true,
    })(req, res, next);
  });
  router.get('/signup', forwardAuthenticated, function (req, res) {
    res.render('signup', { type: 'auth' });
  });

  router.post('/signup', function (req, res) {
    const { email, password, password2 } = req.body;
    let errors = [];

    if (!email || !password || !password2) {
      errors.push({ msg: 'Please Enter all fields' });
    }
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
      res.render('signup', {
        errors,
        email,
        password,
        password2,
      });
    } else {
      User.findOne({ email: email }).then((user) => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('signup', {
            errors,
            email,
            password,
            password2,
            type: 'auth',
          });
        } else {
          const newUser = new User({
            email,
            password,
            mainBox: [
              {
                title: 'Example',
                objective: '새로운 취미',
                themeId: 'modern',
                smallPlans: [
                  {
                    objective: '수영',
                    plans: [
                      '수영장 등록',
                      '발차기 30분',
                      '자유형 마스터',
                      '바다수영 도전',
                      '수영용품 구매',
                      '배영 연습',
                      '스킨스쿠버',
                      '강습',
                    ],
                  },
                  {
                    objective: '자전거',
                    plans: [
                      '중고 자전거 구매',
                      '헬멧 보호대 착용',
                      '출퇴근시 타고 다니기',
                      '아빠와 주말에 자전거 타기',
                      '자전거 액세서리 사기',
                      '한강에서 타기',
                      '유튜브로 강의보기',
                      '강습',
                    ],
                  },
                  {
                    objective: '베이킹',
                    plans: [
                      '아메리칸 쿠키',
                      '스콘',
                      '유튜브 구독',
                      '베이킹 용품 구입',
                      '엄마의 생일 케이크 도전',
                      '식빵 굽기',
                      '오븐 사기',
                      '친구들과 베이킹',
                    ],
                  },
                  {
                    objective: '플랜테리어',
                    plans: [
                      '물 주는 시기 기록해두기',
                      '올리브 나무',
                      '선인장',
                      '관련 도서 읽어보기',
                      '내가 키우고 싶은 식물은?',
                      '식물 영양제, 화분 구매',
                      '유튜브 구독하기',
                      '가지치기',
                    ],
                  },
                  {
                    objective: '캘라그래피',
                    plans: [
                      '캘라그래피 책 완독',
                      '매일 20분씩',
                      '유튜브 보기',
                      '외주 받아보기',
                      '좋은 펜 사기',
                      '친구 만들어주기',
                      '강습받기',
                      '예쁜 노트 사기',
                    ],
                  },
                  {
                    objective: '캐리커쳐',
                    plans: [
                      '내 얼굴 캐릭터',
                      '매일 20분씩',
                      '유튜브 보기',
                      '외주 받아보기',
                      '스케치북 사기',
                      '친구 그려주기',
                      '강습받기',
                      '좋은 연필 사기',
                    ],
                  },
                  {
                    objective: '넷플릭스',
                    plans: [
                      '매달 구독',
                      '맛있는 간식 준비',
                      '추천 영화보기',
                      '드라마 정주행',
                      '영어공부',
                      '친구와 함께보기',
                      '빔 프로젝터 사기',
                      '좋은 스피커 사기',
                    ],
                  },
                  {
                    objective: '다이어리',
                    plans: [
                      '예쁜 다이어리 사기',
                      '자기 전 30분',
                      '한달에 한권 독후감',
                      '1년 한권 완성하기',
                      '일기기록',
                      '온라인으로 도전',
                      '예쁜 펜 사기',
                      '스티커로 꾸미기',
                    ],
                  },
                ],
              },
            ],
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  req.flash(
                    'success_msg',
                    'You are not registered and can log in'
                  );
                  res.redirect('/auth/login');
                })
                .catch((err) => console.log(err));
            });
          });
        }
      });
    }
  });

  router.get('/logout', function (req, res) {
    req.logout();
    req.session.save(function (err) {
      res.redirect('/');
    });
  });

  return router;
};
