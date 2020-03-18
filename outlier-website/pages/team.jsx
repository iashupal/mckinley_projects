import React from 'react';

import '../styles/global.css';
import Layout from '../components/Layout';
import SemiOverlayImage from '../components/SemiOverlayImage';
import ShowcaseGrid from '../components/ShowcaseGrid';
import TitleTeamContent from '../components/TitleTeamContent';
import ParaWithImg from '../components/ParaWithImg';

export default function Team() {
  const philosophies = {
    0: {
      title: '책임이 전제된 자율성',
      content:
        '팀원 모두가 맡은 업무에서 의사결정의 강력한 위임을 받은 오너가 됩니다. 오너는 주인의식을 갖고 자율적으로 행동합니다. 각자의 책임감이 무너지면 불필요한 프로세스가 난무하게 되고 자율의 원칙을 유지할 수 없습니다. 팀에 대한 신의를 스스로 지켜내며, 자율의 원칙을 강화합니다.',
    },
    1: {
      title: '논리에 기반을 둔 자존감',
      content:
        '내가 하는 일을 왜 하는지 설명할 수 있습니다. 논리에 기반을 두고 일하는 사람은 자신의 능력과 의견에 대해 당당해집니다. 비논리에서 비롯되는 불합리한 것들을 타파하고 팀의 변화를 이끌기 위해 용기를 내고 도전할 수 있습니다. 그 과정에서 갈등이 발생하더라도, 우리는 논리의 힘으로 더 나은 결정을 내려 성장의 길로 향합니다.',
    },
    2: {
      title: '실질을 위한 반항',
      content:
        '형식과 규율, 눈치와 체면, 위계질서와 관료주의, 강요된 겸손 제스처 등 일의 효율을 방해하는 모든 것에 반항합니다. 꼭 필요해보이는 형식이라도 다시 한 번 생각해보 며, 실질적인 내용에만 집중합니다. 높은 수준의 상호신뢰를 통해 없앨 수 있는 프로세스를 계속 해서 없애 가며 실질에 집중할 수 있는 환경을 만듭니다.',
    },
    3: {
      title: '인정과 명확성',
      content:
        '나의 의견을 한 문장으로 설명하지 못한다는 것은 충분한 고민이 없었거나 논리가 부족하다는 뜻입니다. 자신의 실수를 인정하고 정확한 피드백을 받습니다. 우리에게 필요한 건 적당히 좋은 포장으로 합리화 된 수십 개의 의견이 아닌, 변화를 시작할 수 있는 명확한 주제입니다.',
    },
    4: {
      title: '간절함에서 비롯된 치열함',
      content:
        '성공에 대해 간절합니다. 익숙함에 젖어 고민 없이 일하지 않습니다. 우리는 우리의 손으로 시장을 혁신하며, 고객에게 가장 좋은 경험을 전할 방법을 치열하게 고민합니다.',
    },
    5: {
      title: '효율을 위한 투명성',
      content:
        '회사의 방향성에 대해 고민하거나 정보를 획득하기 위해 누구를 찾아야 할지 망설이지 않습니다. 존재하지 않을 수도 있는 잠재적 위험에 대한 걱정보다 정보의 개방을 통한 일의 효율성을 추구합니다.',
    },
  };

  const goal = {
    0: {
      imgSrc:
        'https://images.unsplash.com/photo-1559574139-122bfee565f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80',
      content:
        '높은 역량을 갖추고, 논리에 기반하여 행동하는 사람들은 스스로에게 당당합니다. 이러한 사람들은 세세한 규칙 없이 자율적일 때 더 높은 성과를 내며, 개인의 이익이 아닌 회사 전체의 이익을 먼저 보는 인재입니다.',
    },
    1: {
      imgSrc:
        'https://images.unsplash.com/photo-1470219556762-1771e7f9427d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80',
      content:
        '이러한 인재들이 모인 아웃라이어스 팀은 명분 없는 형식을 지속적으로 없애고, 훌륭한 동료의 자극과 회사의 성장으로부터 스스로의 사명감을 세워갑니다',
    },
    2: {
      imgSrc:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      content:
        '내가 이 일을 왜 하는가를 계속해서 질문하며, 내 손으로 시장을 혁신하는 일, 그 과정에서 최고의 동료와 함께 하는 것이 자랑스러운 사람들, 아웃라이어스는 이런 분들과 함께 성장하고자 합니다.',
    },
  };

  const members = {
    person1: {
      image: '/static/images/team/soyul.jpg',
      name: 'Soyul Sim',
      role: 'Founder & CEO',
      education:
        'Korea University, Early Graduation with Honors (B. Home Economics & Public Governance., Summa Cum Laude)',
      bioLink: 'https://www.linkedin.com/company/',
    },
    person2: {
      image: '/static/images/team/minjoo.jpg',
      name: 'Minjoo Kim',
      role: 'Brand Designer',
      education: 'Hongik University (B.F.A., Product Design.)',
      bioLink: 'https://www.linkedin.com/company/',
    },
    person3: {
      image: '/static/images/team/sooyun.jpg',
      name: 'Sooyun Choi',
      role: 'Marketing Director',
      education: 'Korea University (B. International Studies.)',
      bioLink: 'https://www.linkedin.com/company/',
    },
    person4: {
      image: '/static/images/team/felix.jpg',
      name: 'Felix Kim',
      role: 'LEAD DEVELOPER',
      education: 'Yonsei University (B.B.A., Magna Cum Laude)',
      bioLink: 'https://www.mckinleyrice.com',
    },
    person5: {
      image: '/static/images/team/donghan.jpg',
      name: 'Donghan Lee ',
      role: 'User Psychology Advisor for Operation',
      education:
        'Doctor, Clinical Professor, Pusan National University (M.D.), Korea University (B.S.)',
      bioLink: 'https://www.linkedin.com/company/',
    },
    person6: {
      image: '/static/images/team/jonghyun.jpg',
      name: 'Jonghyun Park',
      role: 'Developer',
      education:
        'Yonsei University (B.S., Candidate in Philosophy of Electrical and Electronic Engineering)',
      bioLink: 'https://www.linkedin.com/company/',
    },
    person7: {
      image: '/static/images/team/yebin.jpg',
      name: 'Yebin Kim',
      role: 'Marketing Strategy Assistant Manager',
      education: 'Korea University (B. International Studies.)',
      bioLink: 'https://www.linkedin.com/company/',
    },
  };

  return (
    <Layout
      heroText="높은 자존감을 갖춘 사람들에게
    자율성을 보장해 더 크게 성장합니다."
    >
      <SemiOverlayImage />
      <ParaWithImg contentData={goal} />
      <div className="semi-overlay-image">
        <img
          className="team__image"
          src="../static/images/team/team_img-2.jpg"
          alt=""
        />
      </div>
      <TitleTeamContent contentObject={philosophies} />
      <ShowcaseGrid members={members} />
    </Layout>
  );
}
